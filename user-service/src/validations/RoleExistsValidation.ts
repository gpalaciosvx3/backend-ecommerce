import { UserValidation } from "./UserValidation";
import { NotFoundError } from "../middleware/errorHandler";
import { ManagementService } from "../services/User/ManagementService";

export class RoleExistsValidation extends UserValidation {
  constructor(private roleRepository: any) {
    super();
  }

  /*
  * Valida que exista el Rol
  */
  async validate(data: any) {        
    const existingRole = await this.roleRepository.findRoleById(data.roleId);
    if (!existingRole) throw new NotFoundError(`USR => El rol con ID ${data.roleId} no existe`); 
   
    // Extendemos rol transformado
    data.role = ManagementService.transformRoleForAuth(existingRole);      

    await super.validate(data); 
  }
}
