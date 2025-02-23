import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../middleware/errorHandler";

export class ManagementService {
  private userRepository = new UserRepository();

  async deactivateUser(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundError("Usuario no encontrado");
    // Aquí podríamos cambiar un campo `isActive = false`
    return { message: "Usuario desactivado con éxito" };
  }
}
