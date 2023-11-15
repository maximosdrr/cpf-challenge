import { DIContainer } from '../../../infra/di/di';
import { CacheManager } from '../../lib/cache/cache.lib';

const cacheKeyPrefix = 'cache-response:';

export function CacheResponse(expirationSeconds: number) {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: unknown[]) {
      const di = DIContainer.getInstance();
      const cacheManager = di.diContainer.get(CacheManager);

      const cacheKey = cacheKeyPrefix + propertyKey + JSON.stringify(args);
      const cachedValue = await cacheManager.get<string>(cacheKey);
      if (cachedValue) {
        return JSON.parse(cachedValue);
      }
      const result = await originalMethod.apply(this, args);
      await cacheManager.set(cacheKey, JSON.stringify(result), expirationSeconds);
      return result;
    };
    return descriptor;
  };
}
