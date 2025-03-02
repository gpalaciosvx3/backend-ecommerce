import { config } from 'dotenv';
import { UserValidation } from "./UserValidation";
import { AppError } from "../middleware/errorHandler";

config(); 

export class AdminUniqueValidation extends UserValidation {
    constructor(private userRepository: any) { 
        super();
    }

    /**
     * Valida que el único Admin existente no pueda cambiar de rol
     */
    async validate(data: any) {
        if (data.roleId === process.env.ADMIN_ROLE_ID && data.role.roleName.toLowerCase() !== "admin") {
          const countAdmin = await this.userRepository.countAdmins();
          if (countAdmin === 1) throw new AppError("ROL => Este usuario es el único Admin existente actualmente, no puede ser actualizado su rol", 401);
        }

        await super.validate(data);
    }
}
