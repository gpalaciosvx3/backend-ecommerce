import { Request } from "express";
import { CacheService } from "../../services/CacheService";
import { UserRepository } from "../../repositories/UserRepository";
import { NotFoundError } from "../../middleware/errorHandler";
import { ApiResponse } from "../../utils/ApiResponse";
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

    const { data, fromCache } = await CacheService.getOrSetCache(
        cacheKey,
        async () => {
            return await this.userRepository.findUser(username);
        },
        useCache
    );

    return ApiResponse.success(
        fromCache ? "[CC] Usuarios obtenidos con éxito" : "Usuarios obtenidos desde DB",
        data
    );
  }

}

