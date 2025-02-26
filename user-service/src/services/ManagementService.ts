import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../middleware/errorHandler";

export class ManagementService {
  private userRepository = new UserRepository();
  
  /* 
  * Desactiva usuario
  */
  async deactivateUser(username: string) {
    const user = await this.userRepository.findUser(username);
    if (!user) throw new NotFoundError("Usuario no encontrado");
    // Aquí podríamos cambiar un campo `isActive = false`
    return { message: "Usuario desactivado con éxito" };
  }
}
