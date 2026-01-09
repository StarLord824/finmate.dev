import { Router } from 'express';
import agentsRouter from './agents';
import simulationsRouter from './simulations';
import replayRouter from './replay';
import leaderboardsRouter from './leaderboards';

const arenaRouter = Router();

arenaRouter.use('/agents', agentsRouter);
arenaRouter.use('/simulations', simulationsRouter);
arenaRouter.use('/replay', replayRouter);
arenaRouter.use('/leaderboards', leaderboardsRouter);

export default arenaRouter;
