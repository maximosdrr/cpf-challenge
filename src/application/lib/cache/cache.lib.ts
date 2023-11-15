import { injectable } from 'inversify';

@injectable()
export abstract class CacheManager {
  abstract get<T>(key: string): Promise<T | null>;
  abstract set(cacheKey: string, data: unknown, ttl: number): Promise<void>;
  abstract del(key: string): Promise<void>;
}
