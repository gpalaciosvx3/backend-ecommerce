import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  enableOfflineQueue: false, 
});

redis.on("error", (err) => {
  console.warn("No se pudo conectar a Redis: ", err.message);
});

export default redis;
