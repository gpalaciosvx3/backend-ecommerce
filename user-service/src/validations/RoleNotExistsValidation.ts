import { UserValidation } from "./UserValidation";
import { AppError } from "../middleware/errorHandler";
import { ManagementService } from "../services/User/ManagementService";

export class RoleNotExistsValidation extends UserValidation {
  constructor(private roleRepository: any) {
    super();
  }

  /*
  * Valida que exista el Rol
  */
  async validate(data: any) {    
    const existingRole = await this.roleRepository.findRoleByName(data.roleName);
    if (existingRole) throw new AppError(`ROL => El rol ${data.roleName} ya existe`, 400); 
   
    // Extendemos rol transformado
    data.role = ManagementService.transformRoleForAuth(existingRole);   

    await super.validate(data); 
  }
}
