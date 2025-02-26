import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../middleware/errorHandler";

export class ProfileService {
  private userRepository = new UserRepository();

  /* 
  * Obtiene usuarios de manera general
  * username string | undefined
  */
  async getUserQuery(username?: string) {
    const user = await this.userRepository.findUser(username);
    if (!user || (Array.isArray(user) && user.length === 0)) throw new NotFoundError("Perfil no encontrado");
    return user;
  }


}
