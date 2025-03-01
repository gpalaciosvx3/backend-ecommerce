import { Request, Response, NextFunction } from "express";
import { redis } from "../services/CacheService";

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!redis) {
    (req as any).useCache = false;
    return next();
  }

  (req as any).useCache = true;
  next();
};

