import { UserValidation } from "./UserValidation";
import { NotFoundError } from "../middleware/errorHandler";

export class UsernameExistsValidation extends UserValidation {
  constructor(private userRepository: any) {
    super();
  }

  /* 
  * Valida si es que ya existe el Usuario
  */
  async validate(data: any) {   
    const existingUser = await this.userRepository.findOnlyByUsername(data.username);
    if (!existingUser) throw new NotFoundError(`USR => El usuario ${data.username} no existe en la DB`);    

    // Extiende usuario encontrado de la validacion con parametros recibidos del Body
    Object.assign(data, existingUser);   
   
    await super.validate(data); 
  }
}
