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
  private static TOKEN_BLACKLIST_PREFIX = "blacklisted-token:";

  // Guardar datos en caché (solo si Redis está disponible)
  public static async setCache(key: string, value: any, ttl: number = Number(process.env.REDIS_TTL) || 500): Promise<void> {
    if (!redis) return; 
    try {
      await redis.setex(key, ttl, JSON.stringify(value));
      logger.debug(`Caché guardado: ${key}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado";
      logger.warn(`Error guardando en Redis (${key}): ${errorMessage}`);
    }
  }

  // Obtener datos de caché (solo si Redis está disponible)
  public static async getCache<T>(key: string): Promise<T | null> {
    if (!redis) return null; // Si Redis no está disponible, devolver null
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado";
      logger.warn(`Error obteniendo datos de Redis (${key}): ${errorMessage}`);
      return null;
    }
  }

  // Nueva función que maneja caché en una sola llamada
  public static async getOrSetCache<T>(
    cacheKey: string,
    fetchData: () => Promise<T>,
    useCache: boolean = true
  ): Promise<{ data: T; fromCache: boolean }> {   
    if (useCache) {
      const cachedData = await this.getCache<T>(cacheKey);
      if (cachedData) {
        logger.info(`Datos obtenidos desde caché: ${cacheKey}`);
        return { data: cachedData, fromCache: true };
      }
      logger.info(`No hay datos en caché, consultando DB para: ${cacheKey}`);
    }

    // Obtener datos desde la fuente (ejemplo: DB)
    const data = await fetchData();

    // Guardar en caché si es necesario
    if (useCache && data) await this.setCache(cacheKey, data);

    return { data, fromCache: false };
  }

  // Agregar token a la lista negra con tiempo de expiración
  public static async invalidateToken(token: string, expiresIn: number = 3600) {
    if (!redis) return null;
    try {
        await redis.setex(`${this.TOKEN_BLACKLIST_PREFIX}${token}`, expiresIn, "invalid");
        logger.info(`Token invalidado: ${token}`);
    } catch (error) {
        logger.error("Error al invalidar token en Redis:", error);
    }
  }

  // Verificar si el token está en la lista negra
  public static async isTokenInvalid(token: string): Promise<boolean> {
    if (!redis) return false; 
    try {
        const result = await redis.get(`${this.TOKEN_BLACKLIST_PREFIX}${token}`);
        return result !== null;
    } catch (error) {
        logger.error("Error al verificar token en Redis:", error);
        return false;
    }
  }

}
