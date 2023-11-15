import { CacheManager } from '../../../application/lib/cache/cache.lib';
import Redis from 'ioredis';
import { ConfigManager } from '../../../application/lib/config-manager/config-manager.lib';
import { inject, injectable } from 'inversify';

@injectable()
export class CacheManagerRedisImpl implements CacheManager {
  private client: Redis;

  constructor(@inject(ConfigManager) private readonly configManager: ConfigManager) {
    const redisHost = this.configManager.getOrThrowError('REDIS_HOST');
    const redisPort = Number(this.configManager.getOrThrowError('REDIS_PORT'));

    this.client = new Redis(redisPort, redisHost);
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = (await this.client.get(key)) as unknown as T;
      return data;
    } catch (error) {
      console.error('Error getting data from cache:', error);
      return null;
    }
  }

  async set(key: string, value: string, expiresInSeconds?: number): Promise<void> {
    try {
      if (expiresInSeconds) {
        await this.client.set(key, value, 'EX', expiresInSeconds);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      console.error('Error setting data in cache:', error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Error deleting data from cache:', error);
    }
  }
}
