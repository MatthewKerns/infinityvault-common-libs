/**
 * SecretsCache - Green Phase Implementation
 * Minimal caching mechanism with TTL and LRU eviction
 */

import { CacheEntry } from './types.js';

export interface CacheConfig {
  ttlMs: number;
  maxEntries: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
}

export interface MemoryUsage {
  entryCount: number;
  estimatedSizeBytes: number;
}

export class SecretsCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private accessOrder = new Map<string, number>();
  private accessCounter = 0;
  private stats = { hits: 0, misses: 0 };

  constructor(private config: CacheConfig) {}

  set(key: string, value: T, customTtl?: number): void {
    if (!key) {
      throw new Error('Key cannot be empty');
    }
    if (value === null || value === undefined) {
      throw new Error('Value cannot be null or undefined');
    }
    if (customTtl !== undefined && customTtl < 0) {
      throw new Error('TTL must be a positive number');
    }

    const ttl = customTtl ?? this.config.ttlMs;
    const entry: CacheEntry<T> = {
      value,
      timestamp: Date.now(),
      ttl
    };

    this.cache.set(key, entry);
    this.accessOrder.set(key, ++this.accessCounter);

    // Evict if over max size
    if (this.cache.size > this.config.maxEntries) {
      this.evictOldest();
    }
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.accessOrder.delete(key);
      this.stats.misses++;
      this.cleanupExpired(); // Cleanup other expired entries
      return null;
    }

    this.accessOrder.set(key, ++this.accessCounter);
    this.stats.hits++;
    return entry.value;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.accessOrder.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
    this.accessOrder.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder.clear();
  }

  size(): number {
    return this.cache.size;
  }

  getRemainingTtl(key: string): number {
    const entry = this.cache.get(key);
    if (!entry) return 0;

    const elapsed = Date.now() - entry.timestamp;
    const remaining = entry.ttl - elapsed;
    return Math.max(0, remaining);
  }

  getStats(): CacheStats {
    const total = this.stats.hits + this.stats.misses;
    return {
      ...this.stats,
      size: this.cache.size,
      hitRate: total > 0 ? this.stats.hits / total : 0
    };
  }

  resetStats(): void {
    this.stats = { hits: 0, misses: 0 };
  }

  getMemoryUsage(): MemoryUsage {
    const entryCount = this.cache.size;
    // Rough estimate: each entry is approximately 100-200 bytes
    const estimatedSizeBytes = entryCount * 150;

    return {
      entryCount,
      estimatedSizeBytes
    };
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestAccess = Infinity;

    for (const [key, accessTime] of this.accessOrder) {
      if (accessTime < oldestAccess) {
        oldestAccess = accessTime;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.accessOrder.delete(oldestKey);
    }
  }

  private cleanupExpired(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, entry] of this.cache) {
      if (now - entry.timestamp > entry.ttl) {
        expiredKeys.push(key);
      }
    }

    for (const key of expiredKeys) {
      this.cache.delete(key);
      this.accessOrder.delete(key);
    }
  }
}