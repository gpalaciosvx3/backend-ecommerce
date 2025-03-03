import { UserValidation } from "./UserValidation";
import { AppError } from "../middleware/errorHandler";

export class UserNotExistsByRoleId extends UserValidation {
  constructor(private userRepository: any) {
    super();
  }

  /* 
  * Valida que NO exista un usuario con el rol especificado
  */
  async validate(data: any) {      
    const existingRoleUser = await this.userRepository.findByRoleId(data.role.roleId);    
    if (existingRoleUser.length > 0) throw new AppError(`USR => Existen usuario(s) con el rol ${data.roleName} y no puede ser eliminado.`, 400);    
       
    await super.validate(data); 
  }
}
