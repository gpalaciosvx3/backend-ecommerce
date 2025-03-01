import { RoleRepository } from "../repositories/RoleRepository";
import { AppError, NotFoundError } from "../middleware/errorHandler";
import { ApiResponse } from "../utils/ApiResponse";

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
  async getRoles() {
    const rol = await this.roleRepository.getAllRoles();

    // if (!rol || (Array.isArray(rol) && rol.length === 0)) throw new NotFoundError("USR => Perfil no encontrado");

    return ApiResponse.success("Rol encontrado con éxito", rol);
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
