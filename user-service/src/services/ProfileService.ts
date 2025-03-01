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
  async obtainUser(username?: string, useCache = false, cacheKey?: string) {
    // **1. Si se envuelve la ruta en cache, entonces valida que exista la data**
    if (useCache && cacheKey) {
      const cachedUser = await CacheService.getCache(cacheKey);
      if (cachedUser) return ApiResponse.success("[C] Usuario encontrado con éxito", cachedUser);
    }

    // **2. Si no se obtiene data en cache, revisa en repository**
    const user = await this.userRepository.findUser(username);
    if (!user || (Array.isArray(user) && user.length === 0)) throw new NotFoundError("USR => Perfil no encontrado");

    const response = ApiResponse.success("Usuario encontrado con éxito", user);

    if (useCache && cacheKey) await CacheService.setCache(cacheKey, response.toJSON());
    
    return response;
  }

}
