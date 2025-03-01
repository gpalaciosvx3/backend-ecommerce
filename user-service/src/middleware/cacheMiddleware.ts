import { Request, Response, NextFunction } from "express";
import { redis } from "../services/CacheService";

export const cacheMiddleware = (cacheKeyGenerator: (req: Request) => string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!redis) {
      req.useCache = false; 
      return next();
    }

    const cacheKey = cacheKeyGenerator(req);
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log(`Cache hit para ${cacheKey}`);
      return res.status(200).json(JSON.parse(cachedData));
    }

    req.useCache = true; 
    req.cacheKey = cacheKey;
    next();
  };
};
