import { config } from 'dotenv';
import { UserValidation } from "./UserValidation";
import { AppError } from "../middleware/errorHandler";

config(); 

export class AdminStatusValidation extends UserValidation {
    /**
     * Valida que un usuario admin no pueda ser inactivado
     */
    async validate(data: any) {
        if (
          data.roleId === process.env.ADMIN_ROLE_ID &&
          data.userFormStatus === "inactive"
        ) throw new AppError(`USR => El Usuario ${data.username} es Admin y no puede pasar a Inactivo`, 404);

        await super.validate(data);
    }
}
