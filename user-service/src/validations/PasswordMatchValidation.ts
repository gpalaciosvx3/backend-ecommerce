import bcrypt from "bcrypt";
import { UserValidation } from "./UserValidation";
import { NotFoundError } from "../middleware/errorHandler";

export class PasswordMatchValidation extends UserValidation {
    constructor(private userRepository: any) {
        super();
    }

    /**
     * Valida que la contraseña proporcionada coincida con la almacenada en la base de datos
     */
    async validate(data: any) {     
      const user = await this.userRepository.findByUsername(data.username);
      if (!user) throw new NotFoundError("USR => Usuario no encontrado");    

      const isMatch = await bcrypt.compare(data.UserFormPassword, user.password);
      if (!isMatch) throw new NotFoundError("USR => Contraseña incorrecta");

      // Pasamos al siguiente validador en la cadena
      await super.validate(data);
    }
}
