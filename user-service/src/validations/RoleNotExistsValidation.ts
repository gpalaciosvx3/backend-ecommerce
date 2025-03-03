import { UserValidation } from "./UserValidation";
import { AppError } from "../middleware/errorHandler";

export class RoleNotExistsValidation extends UserValidation {
  constructor(private roleRepository: any) {
    super();
  }

  /*
  * Valida que NO exista el Rol para continuar
  */
  async validate(data: any) {    
    const existingRole = await this.roleRepository.findRoleByName(data.roleName);
    if (existingRole) throw new AppError(`ROL => El rol ${data.roleName} ya existe`, 400); 

    await super.validate(data); 
  }
}
