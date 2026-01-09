import Redis from 'ioredis';
import type { ArenaEvent, ARENA_CHANNELS } from '@repo/arena-types';
import { pino } from 'pino';

const logger = pino({ name: 'arena-events' });

export class EventPublisher {
  private redis: Redis;
  private simulationId: string;

  constructor(redisUrl: string, simulationId: string) {
    this.redis = new Redis(redisUrl);
    this.simulationId = simulationId;
  }

  /**
   * Publish event to simulation channel
   */
  async publish(event: ArenaEvent): Promise<void> {
    const channel = `arena:simulation:${this.simulationId}`;
    try {
      await this.redis.publish(channel, JSON.stringify(event));
      logger.debug({ eventType: event.type, channel }, 'Event published');
    } catch (error) {
      logger.error({ error, eventType: event.type }, 'Failed to publish event');
    }
  }

  /**
   * Publish to market-specific channel
   */
  async publishMarket(event: ArenaEvent): Promise<void> {
    const channel = `arena:market:${this.simulationId}`;
    await this.redis.publish(channel, JSON.stringify(event));
  }

  /**
   * Publish to agent-specific channel
   */
  async publishToAgent(agentId: string, event: ArenaEvent): Promise<void> {
    const channel = `arena:agent:${this.simulationId}:${agentId}`;
    await this.redis.publish(channel, JSON.stringify(event));
  }

  /**
   * Store event in Redis list for replay
   */
  async storeEvent(event: ArenaEvent): Promise<void> {
    const key = `arena:events:${this.simulationId}`;
    await this.redis.rpush(key, JSON.stringify(event));
  }

  /**
   * Get all stored events for replay
   */
  async getStoredEvents(): Promise<ArenaEvent[]> {
    const key = `arena:events:${this.simulationId}`;
    const events = await this.redis.lrange(key, 0, -1);
    return events.map(e => JSON.parse(e));
  }

  async close(): Promise<void> {
    await this.redis.quit();
  }
}

export class EventSubscriber {
  private redis: Redis;
  private handlers: Map<string, (event: ArenaEvent) => void> = new Map();

  constructor(redisUrl: string) {
    this.redis = new Redis(redisUrl);
    this.setupSubscriber();
  }

  private setupSubscriber(): void {
    this.redis.on('message', (channel, message) => {
      try {
        const event: ArenaEvent = JSON.parse(message);
        const handler = this.handlers.get(channel);
        if (handler) {
          handler(event);
        }
      } catch (error) {
        logger.error({ error, channel }, 'Failed to process message');
      }
    });
  }

  /**
   * Subscribe to simulation events
   */
  async subscribeToSimulation(
    simulationId: string,
    handler: (event: ArenaEvent) => void
  ): Promise<void> {
    const channel = `arena:simulation:${simulationId}`;
    this.handlers.set(channel, handler);
    await this.redis.subscribe(channel);
    logger.info({ channel }, 'Subscribed to simulation');
  }

  /**
   * Subscribe to market events
   */
  async subscribeToMarket(
    simulationId: string,
    handler: (event: ArenaEvent) => void
  ): Promise<void> {
    const channel = `arena:market:${simulationId}`;
    this.handlers.set(channel, handler);
    await this.redis.subscribe(channel);
  }

  /**
   * Subscribe to agent-specific events
   */
  async subscribeToAgent(
    simulationId: string,
    agentId: string,
    handler: (event: ArenaEvent) => void
  ): Promise<void> {
    const channel = `arena:agent:${simulationId}:${agentId}`;
    this.handlers.set(channel, handler);
    await this.redis.subscribe(channel);
  }

  async unsubscribe(channel: string): Promise<void> {
    await this.redis.unsubscribe(channel);
    this.handlers.delete(channel);
  }

  async close(): Promise<void> {
    await this.redis.quit();
  }
}
