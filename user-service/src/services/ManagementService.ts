import { config } from 'dotenv';
import { UserRepository } from "../repositories/UserRepository";
import { RoleRepository } from "../repositories/RoleRepository";
import { NotFoundError, UnauthorizedError } from "../middleware/errorHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { CacheService } from "../services/CacheService";

config(); 

export class ManagementService {
  private userRepository = new UserRepository();
  private roleRepository = new RoleRepository();

  /* 
  * Maneja status de usuario
  */
  async statusUser(username: string, status: string) {
    const user = await this.userRepository.findUser(username);
    if (!user) throw new NotFoundError("USR => Usuario no encontrado");
    
    const updatedUser = await this.userRepository.updateStatus(username, status);
    return ApiResponse.success("Usuario actualizado con éxito", updatedUser);
  }

  /* 
  * Actualiza Rol del Usuario
  */
  async updateUserRole(username: string, newRoleName: string,  token?: string) {
    // 1. Valida Token
    if (!token) throw new UnauthorizedError("JWT => Token en service no proporcionado");

    // 2. Valida Usuario
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new NotFoundError(`USR => Usuario ${username} no encontrado`);

    // 3. Valida Nuevo Rol
    const rol = await this.roleRepository.findRoleByName(newRoleName);
    if (!rol) throw new NotFoundError(`ROL => Rol ${newRoleName} no encontrado`);

    const updatedRoleUser = await this.userRepository.updateRole(user.id, rol.id);

    // Si el usuario pierde rol de admin, invalidar su token
    if (user.roleId === process.env.ADMIN_ROLE_ID && updatedRoleUser.roleId !== process.env.ADMIN_ROLE_ID) await CacheService.invalidateToken(token);

    return ApiResponse.success("Rol de Usuario actualizado con éxito", updatedRoleUser);
  }

}
