import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../middleware/errorHandler";

export class AuthService {
  private userRepository = new UserRepository();

  /* 
  * Registra usuario
  */
  async registerUser(name: string, email: string, password: string, username: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("USR => El usuario ya existe", 400);
    }
    return this.userRepository.createUser(name, email, password, username);
  }
}
