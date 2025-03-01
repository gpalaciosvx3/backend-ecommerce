import { UserRepository } from "../repositories/UserRepository";
import { UserValidation } from "./UserValidation";
import { AppError } from "../middleware/errorHandler";

export class UsernameExistsValidation extends UserValidation {
  constructor(private userRepository: UserRepository) {
    super();
  }

  /* 
  * Valida si es que ya existe el Usuario
  */
  async validate(data: any) {
    const existingUser = await this.userRepository.findUser(data.username);
    if (existingUser) throw new AppError(`USR => El usuario ${data.username} ya existe`, 400); 

    await super.validate(data); 
  }
}
