import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../middleware/errorHandler";

export class ProfileService {
  private userRepository = new UserRepository();

  async getUserProfile(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundError("Perfil no encontrado");
    return user;
  }
}
