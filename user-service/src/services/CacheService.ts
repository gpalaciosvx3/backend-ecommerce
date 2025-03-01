import Redis from "ioredis";
import { config } from "dotenv";
import { logger } from "../utils/logger";

config(); 

// Configurar la conexión a Redis
export const redis = (() => {
  try {
    const client = new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379,
      retryStrategy: (times) => {
        return null; 
      }
    });

    return client;
  } catch (error) {
    logger.warn("Redis no disponible, la API funcionará sin caché.");
    return null; // Si hay un error, deshabilitar Redis
  }
})();


export class CacheService {
  // Guardar datos en caché (solo si Redis está disponible)
  public static async setCache(key: string, value: any, ttl: number = Number(process.env.REDIS_TTL) || 500): Promise<void> {
    if (!redis) return; 
    try {
      await redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado";
      logger.warn("Error guardando en Redis:", errorMessage);
    }
  }

  // Obtener datos de caché (solo si Redis está disponible)
  public static async getCache(key: string): Promise<any | null> {
    if (!redis) return null; // Si Redis no está disponible, devolver null
    try {
      const data = await redis.get(key);     
      return data ? JSON.parse(data) : null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado";
      logger.warn("Error obteniendo datos de Redis: ", errorMessage);
      return null;
    }
  }
}
