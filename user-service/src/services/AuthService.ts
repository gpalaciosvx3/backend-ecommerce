import { config } from 'dotenv';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/* Repositorios */
import { UserRepository } from "../repositories/UserRepository";
import { RoleRepository } from "../repositories/RoleRepository";
/* Validations */
import { UsernameExistsValidation } from "../validations/UsernameExistsValidation";
import { RoleExistsValidation } from "../validations/RoleExistsValidation";
/* Middleware */
import { AppError } from "../middleware/errorHandler";
/* Utils */
import { ApiResponse } from "../utils/ApiResponse";

config(); 

const JWT_SECRET = process.env.JWT_SECRET as string;
export class AuthService {
  private userRepository = new UserRepository();
  private roleRepository = new RoleRepository();

  /* 
  * Genera JWT para el usuario 
  */
  generateToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  }

  /* 
  * Login
  */
  async login(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new AppError("USR => Usuario no encontrado", 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("USR => Contraseña incorrecta", 401);

    const token = this.generateToken(user.id);

    return ApiResponse.success("Logeado con éxito", { token });
  }

  /* 
  * Registra usuario
  */
  async registerUser(name: string, email: string, password: string, username: string, roleName: string) {
    const data: { name: string; email: string; password: string; username: string; roleName: string } & { roleId?: string } = {
      name, email, password, username, roleName
    };
    
    // Crear cadena de validaciones
    const usernameValidation = new UsernameExistsValidation(this.userRepository);
    const roleValidation = new RoleExistsValidation(this.roleRepository);
  
    usernameValidation.setNext(roleValidation);
  
    // Ejecutar validaciones en cadena
    await usernameValidation.validate(data);  
  
    if (!data.roleId) throw new AppError(`ROL => El rol ${roleName} no existe`, 500);
  
    const registedUser = await this.userRepository.createUser(name, email, password, username, data.roleId);
  
    return ApiResponse.success("Usuario registrado con éxito", registedUser);
  }
  
}
