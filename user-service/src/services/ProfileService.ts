import { Request } from "express";
import { CacheService } from "../services/CacheService";
import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../middleware/errorHandler";
import { ApiResponse } from "../utils/ApiResponse";
export class ProfileService {
  private userRepository = new UserRepository();

  /* 
  * Obtiene usuarios de manera general
  * username string | undefined
  */
  async obtainUser(req: Request) {
    const username = req.query.username as string | undefined;
    const cacheKey = username ? `user:${username}` : "user:all";
    const useCache = (req as any).useCache ?? false;

    // **1. Búsqueda en Caché**
    if (useCache) {
      const cachedData = await CacheService.getCache(cacheKey);
      if (cachedData) {
        console.log("Datos obtenidos desde caché para id: ", cacheKey);
        return ApiResponse.success("[CC] Usuarios obtenidos con éxtio", cachedData);
      } 
      console.log("No hay datos en caché, consultando DB...");
    }
    
    // **2. Búsqueda en DB**
    const users = await this.userRepository.findUser(username)
  
    if (!users || (Array.isArray(users) && users.length === 0)) throw new NotFoundError("USR => Perfil no encontrado");
  
    // const response = ApiResponse.success("Usuarios obtenidos con éxito", users);
  
    if (useCache) await CacheService.setCache(cacheKey, users);
  
    return ApiResponse.success("[DB] Usuarios obtenidos con éxito", users);;
  }

}

