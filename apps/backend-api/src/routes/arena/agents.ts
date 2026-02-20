import { Router, Request, Response, type Router as ExpressRouter } from 'express';
import prisma from '@repo/db';

const router: ExpressRouter = Router();

/**
 * GET /arena/agents - List all agents
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const agents = await prisma.arenaAgent.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ agents });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

/**
 * GET /arena/agents/:id - Get single agent
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const agent = await prisma.arenaAgent.findUnique({
      where: { id: req.params.id },
      include: {
        participations: {
          include: { simulation: true },
          orderBy: { simulation: { createdAt: 'desc' } },
          take: 10,
        },
      },
    });
    
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    
    res.json({ agent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agent' });
  }
});

/**
 * POST /arena/agents - Create new agent
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, model, personality, strategy, config } = req.body;
    
    if (!name || !model) {
      return res.status(400).json({ error: 'Name and model are required' });
    }

    const agent = await prisma.arenaAgent.create({
      data: {
        name,
        model,
        personality,
        strategy,
        config: config || {},
      },
    });
    
    res.status(201).json({ agent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create agent' });
  }
});

/**
 * PUT /arena/agents/:id - Update agent
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, model, personality, strategy, config, isActive } = req.body;
    
    const agent = await prisma.arenaAgent.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name }),
        ...(model && { model }),
        ...(personality !== undefined && { personality }),
        ...(strategy !== undefined && { strategy }),
        ...(config && { config }),
        ...(isActive !== undefined && { isActive }),
      },
    });
    
    res.json({ agent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update agent' });
  }
});

/**
 * DELETE /arena/agents/:id - Delete agent (soft delete)
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.arenaAgent.update({
      where: { id: req.params.id },
      data: { isActive: false },
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete agent' });
  }
});

export default router;
