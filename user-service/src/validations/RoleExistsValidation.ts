import { RoleRepository } from "../repositories/RoleRepository";
import { UserValidation } from "./UserValidation";
export class RoleExistsValidation extends UserValidation {
  constructor(private roleRepository: RoleRepository) {
    super();
  }

  /*
  * Valida que exista el Rol
  */
  async validate(data: any) {    
    const roleId = await this.roleRepository.findRoleIdByName(data.roleName);

    data.roleId = roleId;   

    await super.validate(data); 
  }
}
