import { Router, Request, Response, type Router as ExpressRouter } from 'express';
import prisma from '@repo/db';


const router: ExpressRouter = Router();

/**
 * GET /arena/leaderboards - Get agent leaderboards
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { sortBy = 'avgPnlPercent', order = 'desc', limit = 50 } = req.query;
    
    const validSortFields = [
      'totalWins', 'totalSimulations', 'avgPnl', 
      'avgPnlPercent', 'avgSharpe', 'bestPnl',
    ];
    
    const sortField = validSortFields.includes(sortBy as string) 
      ? sortBy as string 
      : 'avgPnlPercent';
    
    const leaderboard = await prisma.arenaLeaderboard.findMany({
      orderBy: { [sortField]: order === 'asc' ? 'asc' : 'desc' },
      take: Number(limit),
    });
    
    res.json({ 
      leaderboard: leaderboard.map((entry: any, index: number) => ({
        rank: index + 1,
        ...entry,
        winRate: entry.totalSimulations > 0 
          ? ((entry.totalWins / entry.totalSimulations) * 100).toFixed(1) + '%'
          : '0%',
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

/**
 * GET /arena/leaderboards/:agentId - Get agent stats
 */
router.get('/:agentId', async (req: Request, res: Response) => {
  try {
    const stats = await prisma.arenaLeaderboard.findUnique({
      where: { agentId: req.params.agentId },
    });
    
    if (!stats) {
      return res.status(404).json({ error: 'Agent stats not found' });
    }
    
    // Get recent performances
    const recentParticipations = await prisma.arenaParticipation.findMany({
      where: { agentId: req.params.agentId },
      include: {
        simulation: true,
      },
      orderBy: { simulation: { completedAt: 'desc' } },
      take: 10,
    });
    
    res.json({ 
      stats,
      recentPerformances: recentParticipations.map((p: any) => ({
        simulationId: p.simulationId,
        simulationName: p.simulation.name,
        market: p.simulation.market,
        pnl: p.pnl,
        pnlPercent: p.pnlPercent,
        rank: p.rank,
        completedAt: p.simulation.completedAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agent stats' });
  }
});

export default router;
