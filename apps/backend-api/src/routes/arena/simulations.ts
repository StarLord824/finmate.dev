import { Router, Request, Response, type Router as ExpressRouter } from 'express';
import prisma from '@repo/db';
import Redis from 'ioredis';

const router: ExpressRouter = Router();
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

/**
 * GET /arena/simulations - List all simulations
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, limit = 20, offset = 0 } = req.query;
    
    const simulations = await prisma.arenaSimulation.findMany({
      where: status ? { status: status as string } : undefined,
      include: {
        participants: {
          include: { agent: true },
        },
        _count: { select: { trades: true, snapshots: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset),
    });
    
    res.json({ simulations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch simulations' });
  }
});

/**
 * GET /arena/simulations/:id - Get single simulation
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const simulation = await prisma.arenaSimulation.findUnique({
      where: { id: req.params.id },
      include: {
        participants: {
          include: { agent: true },
          orderBy: { rank: 'asc' },
        },
        trades: {
          orderBy: { timestamp: 'desc' },
          take: 50,
        },
      },
    });
    
    if (!simulation) {
      return res.status(404).json({ error: 'Simulation not found' });
    }
    
    res.json({ simulation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch simulation' });
  }
});

/**
 * POST /arena/simulations - Create new simulation
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      name,
      market,
      marketType,
      interval = '1h',
      startDate,
      endDate,
      initialBalance = 10000,
      tickIntervalMs = 1000,
      priceImpact = 0.001,
      agentIds,
      config,
    } = req.body;
    
    if (!name || !market || !marketType || !startDate || !endDate || !agentIds?.length) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, market, marketType, startDate, endDate, agentIds' 
      });
    }

    // Create simulation with participants
    const simulation = await prisma.arenaSimulation.create({
      data: {
        name,
        market,
        marketType,
        interval,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        initialBalance,
        tickIntervalMs,
        priceImpact,
        config: config || {},
        participants: {
          create: agentIds.map((agentId: string) => ({
            agentId,
          })),
        },
      },
      include: {
        participants: {
          include: { agent: true },
        },
      },
    });
    
    res.status(201).json({ simulation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create simulation' });
  }
});

/**
 * POST /arena/simulations/:id/start - Start simulation
 */
router.post('/:id/start', async (req: Request, res: Response) => {
  try {
    const simulation = await prisma.arenaSimulation.findUnique({
      where: { id: req.params.id },
    });
    
    if (!simulation) {
      return res.status(404).json({ error: 'Simulation not found' });
    }
    
    if (simulation.status !== 'pending') {
      return res.status(400).json({ error: 'Simulation is not in pending state' });
    }

    // Send start command to orchestrator via Redis
    const redis = new Redis(REDIS_URL);
    
    // Start orchestrator
    await redis.publish('arena:orchestrator:commands', JSON.stringify({
      type: 'start',
      simulationId: simulation.id,
    }));
    
    // Start market simulator
    await redis.publish('arena:simulator:commands', JSON.stringify({
      type: 'start',
      simulationId: simulation.id,
    }));
    
    await redis.quit();
    
    res.json({ message: 'Simulation starting', simulationId: simulation.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start simulation' });
  }
});

/**
 * POST /arena/simulations/:id/stop - Stop simulation
 */
router.post('/:id/stop', async (req: Request, res: Response) => {
  try {
    const simulation = await prisma.arenaSimulation.findUnique({
      where: { id: req.params.id },
    });
    
    if (!simulation) {
      return res.status(404).json({ error: 'Simulation not found' });
    }
    
    if (simulation.status !== 'running') {
      return res.status(400).json({ error: 'Simulation is not running' });
    }

    // Send stop command via Redis
    const redis = new Redis(REDIS_URL);
    
    await redis.publish('arena:orchestrator:commands', JSON.stringify({
      type: 'stop',
      simulationId: simulation.id,
    }));
    
    await redis.publish('arena:simulator:commands', JSON.stringify({
      type: 'stop',
      simulationId: simulation.id,
    }));
    
    await redis.quit();
    
    res.json({ message: 'Simulation stopping', simulationId: simulation.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to stop simulation' });
  }
});

/**
 * POST /arena/simulations/:id/pause - Pause simulation
 */
router.post('/:id/pause', async (req: Request, res: Response) => {
  try {
    const redis = new Redis(REDIS_URL);
    
    await redis.publish('arena:simulator:commands', JSON.stringify({
      type: 'pause',
      simulationId: req.params.id,
    }));
    
    await prisma.arenaSimulation.update({
      where: { id: req.params.id },
      data: { status: 'paused', pausedAt: new Date() },
    });
    
    await redis.quit();
    
    res.json({ message: 'Simulation paused' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to pause simulation' });
  }
});

/**
 * POST /arena/simulations/:id/resume - Resume simulation
 */
router.post('/:id/resume', async (req: Request, res: Response) => {
  try {
    const redis = new Redis(REDIS_URL);
    
    await redis.publish('arena:simulator:commands', JSON.stringify({
      type: 'resume',
      simulationId: req.params.id,
    }));
    
    await prisma.arenaSimulation.update({
      where: { id: req.params.id },
      data: { status: 'running', pausedAt: null },
    });
    
    await redis.quit();
    
    res.json({ message: 'Simulation resumed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to resume simulation' });
  }
});

/**
 * DELETE /arena/simulations/:id - Delete simulation
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.arenaSimulation.delete({
      where: { id: req.params.id },
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete simulation' });
  }
});

export default router;
