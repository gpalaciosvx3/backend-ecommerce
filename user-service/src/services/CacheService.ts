import Redis from "ioredis";
import { config } from "dotenv";

config(); 

// Configurar la conexión a Redis
export const redis = (() => {
  try {
    const client = new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379,
      tls: process.env.REDIS_TLS === "true" ? {} : undefined,
      retryStrategy: (times) => {
        console.warn(`Intento de reconexión a Redis fallido #${times}`);
        return null; // No intentar reconectar automáticamente
      }
    });

    client.on("connect", () => console.log("✅ Conectado a Redis"));
    client.on("error", (err) => {
      console.warn("No se pudo conectar a Redis:", err.message);
    });

    return client;
  } catch (error) {
    console.warn("Redis no disponible, la API funcionará sin caché.");
    return null; // Si hay un error, deshabilitar Redis
  }
})();


export class CacheService {
  // Guardar datos en caché (solo si Redis está disponible)
  public static async setCache(key: string, value: any, ttl: number = Number(process.env.REDIS_TTL) || 1800): Promise<void> {
    if (!redis) return; 
    try {
      await redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado";
      console.warn("Error guardando en Redis:", errorMessage);
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
      console.warn("Error obteniendo datos de Redis: ", errorMessage);
      return null;
    }
  }
}
