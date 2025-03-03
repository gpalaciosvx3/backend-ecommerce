import { config } from 'dotenv';
import { UserValidation } from "./UserValidation";
import { AppError } from "../middleware/errorHandler";

config(); 

export class RoleIsNotAdminValidation extends UserValidation {
  /*
  * Valida que el rol NO sea admin para continuar
  */
  async validate(data: any) {       
    if (data.role.roleId === process.env.ADMIN_ROLE_ID && data.role.roleName.toLowerCase() === "admin") 
    throw new AppError("ROL => El rol Admin no puede ser eliminado", 401);

    await super.validate(data); 
  }
}
