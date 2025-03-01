import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../middleware/errorHandler";
import { ApiResponse } from "../utils/ApiResponse";
export class ProfileService {
  private userRepository = new UserRepository();

  /* 
  * Obtiene usuarios de manera general
  * username string | undefined
  */
  async getUserQuery(username?: string) {
    const user = await this.userRepository.findUser(username);
    if (!user || (Array.isArray(user) && user.length === 0)) throw new NotFoundError("USR => Perfil no encontrado");
    
    return ApiResponse.success("Usuario encontrado con éxito", user);
  }

}
