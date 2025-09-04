import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 300,
  checkperiod: 60,
  useClones: false,
});

export function getFromCache<T>(key: string): T | undefined {
  return cache.get<T>(key);
}

export function setInCache<T>(key: string, value: T, ttl?: number): boolean {
  if (ttl !== undefined) {
    return cache.set(key, value, ttl);
  }
  return cache.set(key, value);
}

export async function getOrSetInCache<T>(
  key: string,
  generator: () => Promise<T>,
  ttl?: number,
): Promise<T> {
  const cached = getFromCache<T>(key);
  if (cached !== undefined) {
    return cached;
  }

  const value = await generator();
  setInCache(key, value, ttl);
  return value;
}

export function deleteFromCache(key: string): number {
  return cache.del(key);
}

export function deleteMultipleFromCache(keys: string[]): number {
  return cache.del(keys);
}

export function hasInCache(key: string): boolean {
  return cache.has(key);
}

export function getCacheKeys(): string[] {
  return cache.keys();
}

export function flushCache(): void {
  cache.flushAll();
}

export function getCacheStats(): NodeCache.Stats {
  return cache.getStats();
}

export function getCacheTtl(key: string): number | undefined {
  return cache.getTtl(key);
}
