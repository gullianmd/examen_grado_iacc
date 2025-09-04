import type { Request, Response, NextFunction } from 'express';
import {
  getFromCache,
  setInCache,
  getCacheKeys,
  deleteMultipleFromCache,
} from '../services/cache.service.js';
import { logger } from '../services/winston.service.js';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export function cacheMiddleware(
  ttl = 300,
  keyGenerator?: (req: Request) => string,
) {
  return function (req: Request, res: Response, next: NextFunction) {
    const cacheKey = keyGenerator
      ? keyGenerator(req)
      : generateDefaultCacheKey(req);

    const cachedResponse = getFromCache(cacheKey);
    if (cachedResponse) {
      logger.info(`Cache hit for key: ${cacheKey}`);
      return res.json(cachedResponse);
    }

    const originalJson = res.json;

    res.json = function (body: unknown): Response {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        logger.info(`Caching response for key: ${cacheKey}, TTL: ${ttl}s`);
        setInCache(cacheKey, body, ttl);
      }

      return originalJson.call(this, body);
    };

    next();
  };
}

function generateDefaultCacheKey(req: Request): string {
  const { method, originalUrl, query } = req;

  let key = `${method}:${originalUrl}`;

  if (Object.keys(query).length > 0) {
    key += `:${JSON.stringify(query)}`;
  }

  if (
    ['POST', 'PUT', 'PATCH'].includes(method) &&
    req.body &&
    typeof req.body === 'object'
  ) {
    const safeBody = { ...(req.body as Record<string, unknown>) };
    if ('password' in safeBody) delete safeBody.password;
    if ('confirmPassword' in safeBody) delete safeBody.confirmPassword;
    if ('token' in safeBody) delete safeBody.token;

    key += `:${JSON.stringify(safeBody)}`;
  }

  return key;
}

export function invalidateCache(
  keyPattern: string | ((req: Request) => string),
) {
  return function (req: Request, res: Response, next: NextFunction) {
    res.on('finish', function () {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const pattern =
          typeof keyPattern === 'function' ? keyPattern(req) : keyPattern;

        const keysToDelete = getCacheKeys().filter(function (key) {
          return key.includes(pattern);
        });

        if (keysToDelete.length > 0) {
          logger.info(`Invalidating cache keys: ${keysToDelete.join(', ')}`);
          deleteMultipleFromCache(keysToDelete);
        }
      }
    });

    next();
  };
}

export const cacheKeyGenerators = {
  byUser: (req: AuthenticatedRequest): string => {
    const userId = req.user?.id ?? 'anonymous';
    return `user:${userId}:${req.method}:${req.originalUrl}`;
  },

  byParams: (req: Request): string => {
    return `${req.method}:${req.originalUrl}:${JSON.stringify(req.params)}`;
  },

  byQuery: (req: Request): string => {
    return `${req.method}:${req.originalUrl}:${JSON.stringify(req.query)}`;
  },
};

