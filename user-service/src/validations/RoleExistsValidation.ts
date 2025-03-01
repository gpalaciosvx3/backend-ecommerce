import { RoleRepository } from "../repositories/RoleRepository";
import { UserValidation } from "./UserValidation";
import { AppError } from "../middleware/errorHandler";

export class RoleExistsValidation extends UserValidation {
  constructor(private roleRepository: RoleRepository) {
    super();
  }

  /*
  * Valida que exista el Rol
  */
  async validate(data: any) {    
    const roleId = await this.roleRepository.getRoleIdByName(data.roleName);

    data.roleId = roleId;   

    await super.validate(data); 
  }
}
