import { pino } from 'pino';
import { SimulationEngine } from './simulation';
import { EventSubscriber } from './events/publisher';

const logger = pino({ 
  name: 'arena-market-simulator',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const PORT = process.env.PORT || 4001;

// Active simulations
const activeSimulations: Map<string, SimulationEngine> = new Map();

/**
 * Start a simulation by ID
 */
export async function startSimulation(simulationId: string): Promise<void> {
  if (activeSimulations.has(simulationId)) {
    logger.warn({ simulationId }, 'Simulation already running');
    return;
  }

  const engine = new SimulationEngine({
    simulationId,
    redisUrl: REDIS_URL,
  });

  await engine.initialize(simulationId);
  activeSimulations.set(simulationId, engine);
  await engine.start();
}

/**
 * Stop a running simulation
 */
export async function stopSimulation(simulationId: string): Promise<void> {
  const engine = activeSimulations.get(simulationId);
  if (engine) {
    await engine.stop();
    activeSimulations.delete(simulationId);
  }
}

/**
 * Pause a running simulation
 */
export function pauseSimulation(simulationId: string): void {
  const engine = activeSimulations.get(simulationId);
  if (engine) {
    engine.pause();
  }
}

/**
 * Resume a paused simulation
 */
export function resumeSimulation(simulationId: string): void {
  const engine = activeSimulations.get(simulationId);
  if (engine) {
    engine.resume();
  }
}

/**
 * Execute a trade for an agent
 */
export async function executeTrade(
  simulationId: string,
  agentId: string,
  action: 'buy' | 'sell',
  quantity: number,
  reasoning?: string
): Promise<boolean> {
  const engine = activeSimulations.get(simulationId);
  if (!engine) {
    logger.warn({ simulationId }, 'Simulation not found');
    return false;
  }

  return engine.executeTrade({ agentId, action, quantity, reasoning });
}

/**
 * Get current state of a simulation
 */
export function getSimulationState(simulationId: string) {
  const engine = activeSimulations.get(simulationId);
  return engine?.getState() || null;
}

/**
 * Get market snapshot for a simulation
 */
export function getMarketSnapshot(simulationId: string) {
  const engine = activeSimulations.get(simulationId);
  return engine?.getMarketSnapshot() || null;
}

// Main entry point
async function main() {
  logger.info({ port: PORT, redis: REDIS_URL }, 'Arena Market Simulator starting...');

  // Set up command listener via Redis
  const subscriber = new EventSubscriber(REDIS_URL);
  
  // Listen for control commands (would be sent by orchestrator)
  // This is a simple pattern - in production, use proper RPC or HTTP API
  
  logger.info('Arena Market Simulator ready');
  
  // Keep process alive
  process.on('SIGINT', async () => {
    logger.info('Shutting down...');
    for (const [id] of activeSimulations) {
      await stopSimulation(id);
    }
    await subscriber.close();
    process.exit(0);
  });
}

main().catch(error => {
  logger.fatal({ error }, 'Failed to start Market Simulator');
  process.exit(1);
});

// Export for programmatic use
export { SimulationEngine } from './simulation';
export { OrderBookEngine } from './orderBook';
export { DataLoader } from './dataLoader';
export { EventPublisher, EventSubscriber } from './events/publisher';
