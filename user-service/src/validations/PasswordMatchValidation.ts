import bcrypt from "bcrypt";
import { UserValidation } from "./UserValidation";
import { NotFoundError } from "../middleware/errorHandler";

export class PasswordMatchValidation extends UserValidation {
    /**
     * Valida que la contraseña proporcionada coincida con la almacenada en la base de datos
     */
    async validate(data: any) {     
      const isMatch = await bcrypt.compare(data.userFormPassword, data.password);
      if (!isMatch) throw new NotFoundError("USR => Contraseña incorrecta");   

      // Pasamos al siguiente validador en la cadena
      await super.validate(data);
    }
}
