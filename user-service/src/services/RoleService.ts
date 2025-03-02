import { Request } from "express";
import { CacheService } from "../services/CacheService";
import { RoleRepository } from "../repositories/RoleRepository";
import { AppError, NotFoundError } from "../middleware/errorHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { logger } from "../utils/logger";

export class RoleService {
  private roleRepository = new RoleRepository();

  /* 
  * Crea Rol
  */
  async createRole(name: string) {
    const existingRole = await this.roleRepository.getRoleByName(name);
    if (existingRole) throw new AppError(`ROL => El rol ${name} ya existe`, 400);
    
    const rol = await this.roleRepository.createRole(name);
    
    return ApiResponse.success("Rol creado con éxito", rol);
  }

  /* 
  * Obtiene Roles
  */
  async obtainRole(req: Request) {
    const name = req.query.name as string | undefined;
    const cacheKey = name ? `rol:${name}` : "rol:all";
    const useCache = (req as any).useCache ?? false;
    console.log('cacheKey: ', cacheKey);
    
    const { data, fromCache } = await CacheService.getOrSetCache(
        cacheKey,
        async () => {
            return await this.roleRepository.findRole(name);
        },
        useCache
    );

    return ApiResponse.success(
        fromCache ? "[CC] Roles obtenidos con éxito" : "Roles obtenidos desde DB",
        data
    );
  }

  /* 
  * Actualiza Rol
  */
  async updateRole(id: string, name: string) {
    const rol = await this.roleRepository.updateRole(id, name);
  }

  /* 
  * Elimina Rol
  */
  async deleteRole(id: string) {
    return await this.roleRepository.deleteRole(id);
  }
}
