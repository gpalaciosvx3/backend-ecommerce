import { Request } from "express";
/* Repositorio */
import { RoleRepository } from "../../repositories/RoleRepository";
/* Validations */
import { RoleNotExistsValidation } from "../../validations/RoleNotExistsValidation";
/* Utils */
import { ApiResponse } from "../../utils/ApiResponse";
/* Service */
import { CacheService } from "../../services/CacheService";
/* MODELS */
import { AuthData } from "../../models/AuthData";

export class RoleService {
  private roleRepository = new RoleRepository();

  /* 
  * Crea Rol
  */
  async createRole(roleName: string) {
    const data: AuthData = { roleName };

    // *1. Crear cadena de validaciones* 
    const roleValidation = new RoleNotExistsValidation(this.roleRepository); // Valida que rol NO exista - Extiende el rol modificado
  
    // *2. Ejecutar validaciones en cadena*
    await roleValidation.validate(data);  

    // *3. Crea rol*
    const rol = await this.roleRepository.createRole(roleName);
    
    return ApiResponse.success("Rol creado con éxito", rol);
  }

  /* 
  * Obtiene Roles
  */
  async obtainRole(req: Request) {
    const name = req.query.name as string | undefined;
    const cacheKey = name ? `rol:${name}` : "rol:all";
    const useCache = (req as any).useCache ?? false;
    
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
    const updatedRole = await this.roleRepository.updateRole(id, name);

    return ApiResponse.success("Usuario actualizado con éxito", updatedRole);
  }

  /* 
  * Elimina Rol
  */
  async deleteRole(roleName: string) {
    const data: AuthData = { roleName };

    // *1. Crear cadena de validaciones* 
    const roleValidation = new RoleNotExistsValidation(this.roleRepository); // Valida que rol NO exista - Extiende el rol modificado
  
    // *2. Ejecutar validaciones en cadena*
    await roleValidation.validate(data);  

    // *3. Elimina rol*
    const deletedRole = await this.roleRepository.deleteRole(data.role!.roleId);

    return ApiResponse.success("Usuario eliminado con éxito", deletedRole);
  }
}
