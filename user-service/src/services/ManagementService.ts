import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../middleware/errorHandler";
import { ApiResponse } from "../utils/ApiResponse";
export class ManagementService {
  private userRepository = new UserRepository();
  
  /* 
  * Maneja status de usuario
  */
  async statusUser(username: string, status: string) {
    const user = await this.userRepository.findUser(username);
    if (!user) throw new NotFoundError("USR => Usuario no encontrado");
    
    const updatedUser = await this.userRepository.updateStatus(username, status);
    return ApiResponse.success("Usuario actualizado con éxito", updatedUser);
  }
}
