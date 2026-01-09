import { Router, Request, Response } from 'express';
import { prisma } from '@repo/db';

const router = Router();

/**
 * GET /arena/replay/:id - Get replay data for a simulation
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const simulation = await prisma.arenaSimulation.findUnique({
      where: { id: req.params.id },
      include: {
        participants: {
          include: { agent: true },
        },
      },
    });
    
    if (!simulation) {
      return res.status(404).json({ error: 'Simulation not found' });
    }
    
    if (simulation.status !== 'completed') {
      return res.status(400).json({ error: 'Simulation not completed yet' });
    }

    // Get snapshots for replay
    const snapshots = await prisma.arenaSnapshot.findMany({
      where: { simulationId: req.params.id },
      orderBy: { tick: 'asc' },
    });

    // Get all trades
    const trades = await prisma.arenaTrade.findMany({
      where: { simulationId: req.params.id },
      include: {
        participation: {
          include: { agent: true },
        },
      },
      orderBy: { timestamp: 'asc' },
    });

    res.json({
      simulation,
      snapshots: snapshots.map(s => ({
        tick: s.tick,
        timestamp: s.timestamp,
        price: s.price,
        data: s.data,
      })),
      trades: trades.map(t => ({
        id: t.id,
        timestamp: t.timestamp,
        agentId: t.participation.agentId,
        agentName: t.participation.agent.name,
        action: t.action,
        quantity: t.quantity,
        price: t.price,
        total: t.total,
        reasoning: t.reasoning,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch replay data' });
  }
});

/**
 * GET /arena/replay/:id/snapshots - Get paginated snapshots
 */
router.get('/:id/snapshots', async (req: Request, res: Response) => {
  try {
    const { fromTick = 0, toTick = 1000 } = req.query;
    
    const snapshots = await prisma.arenaSnapshot.findMany({
      where: {
        simulationId: req.params.id,
        tick: {
          gte: Number(fromTick),
          lte: Number(toTick),
        },
      },
      orderBy: { tick: 'asc' },
    });
    
    res.json({ snapshots });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch snapshots' });
  }
});

/**
 * GET /arena/replay/:id/trades - Get trades in time range
 */
router.get('/:id/trades', async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    
    const trades = await prisma.arenaTrade.findMany({
      where: {
        simulationId: req.params.id,
        ...(from && to && {
          timestamp: {
            gte: new Date(from as string),
            lte: new Date(to as string),
          },
        }),
      },
      include: {
        participation: {
          include: { agent: true },
        },
      },
      orderBy: { timestamp: 'asc' },
    });
    
    res.json({ trades });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});

export default router;
