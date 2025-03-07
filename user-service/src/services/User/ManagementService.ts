import { config } from 'dotenv';
/* Repositorios */
import { UserRepository } from "../../repositories/UserRepository";
import { RoleRepository } from "../../repositories/RoleRepository";
/* Validations */
import { UsernameExistsValidation } from "../../validations/UsernameExistsValidation";
import { AdminStatusValidation } from "../../validations/AdminStatusValidation";
import { AdminUniqueValidation  } from "../../validations/AdminUniqueValidation";
import { RoleExistsByNameValidation } from "../../validations/RoleExistsByNameValidation";
/* Utils */
import { ApiResponse } from "../../utils/ApiResponse";
/* Services */
import { CacheService } from "../CacheService";
import { AuthService } from "./AuthService";
/* MODELS */
import { AuthData } from "../../models/AuthData";
import { Role } from "../../models/Role";

config(); 

export class ManagementService {
  private userRepository = new UserRepository();
  private roleRepository = new RoleRepository();

  /* 
  * Maneja status de usuario
  */
  async statusUser(username: string, userFormStatus: string) {
    const data: AuthData = { username, userFormStatus };

    // *1. Crear cadena de validaciones* 
    const usernameValidation = new UsernameExistsValidation(this.userRepository); // Valida que usuario exista - Existende el user
    const adminStatusValidation = new AdminStatusValidation(); // Valida que si usuario es Admin, no pase a Inactivo
  
    usernameValidation.setNext(adminStatusValidation);
  
    // *2. Ejecutar validaciones en cadena*
    await usernameValidation.validate(data);  

    // *3. Actualiza el usuario*
    const updatedUser = await this.userRepository.updateStatus(data.username!, userFormStatus);

    return ApiResponse.success("Usuario actualizado con éxito", updatedUser);
  }

  /* 
  * Actualiza Rol del Usuario
  */
  async updateUserRole(username: string, roleName: string,  token?: string) {
    const data: AuthData = { username, roleName };

    // *1. Crear cadena de validaciones* 
    const usernameValidation = new UsernameExistsValidation(this.userRepository); // Valida que usuario exista - Existende el user
    const roleValidation = new RoleExistsByNameValidation(this.roleRepository); // Valida que rol exista - Extiende el rol modificado
    const adminUniqueValidation = new AdminUniqueValidation (this.userRepository); // Valida que usuario no sea el único admin

    usernameValidation.setNext(roleValidation);
    roleValidation.setNext(adminUniqueValidation);
  
    // *2. Ejecutar validaciones en cadena*
    await usernameValidation.validate(data);  

    // *3. Actualiza Usuario Rol*
    const updatedRoleUser = await this.userRepository.updateRole(data.id!, data.role!.roleId);

    // *4. Extraer userId e isAdmin desde el token*
    const authenticatedUser = token ? AuthService.getUserDataFromToken(token) : null;

    // *5. Si el usuario pierde el rol de admin y es el mismo usuario autenticado, invalidar su token*
    if (
      data.roleId === process.env.ADMIN_ROLE_ID && // Si el usuario antes era admin
      updatedRoleUser.roleId !== process.env.ADMIN_ROLE_ID && // Ahora ya no es admin
      authenticatedUser?.userId === updatedRoleUser.id && // Solo si el usuario autenticado cambió su propio rol
      authenticatedUser?.isAdmin // Y si antes era admin (según el token)
    ) {
        await CacheService.invalidateToken(token!);
    }

    return ApiResponse.success("Rol de Usuario actualizado con éxito", updatedRoleUser);
  }

  /**
   * Transforma un objeto Role para adaptarlo al modelo `AuthData`
   */
  static  transformRoleForAuth(role: Role): { 
      roleId: string;
      roleName: string;
      roleStatus: string;
      roleCreatedAt: Date;
  } {
      return {
          roleId: role.id,
          roleName: role.name,
          roleStatus: role.status,
          roleCreatedAt: role.createdAt
      };
  }

}
