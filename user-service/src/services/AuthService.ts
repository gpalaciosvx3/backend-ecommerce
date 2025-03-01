import { config } from 'dotenv';
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../middleware/errorHandler";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse";

config(); 

const JWT_SECRET = process.env.JWT_SECRET as string;
export class AuthService {
  private userRepository = new UserRepository();

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
  async registerUser(name: string, email: string, password: string, username: string, roleId: string) {
    const existingUser = await this.userRepository.findUser(username);
    
    if (existingUser) throw new AppError(`USR => El usuario ${username} ya existe`, 400);

    const registedUser = await this.userRepository.createUser(name, email, password, username, roleId);

    return ApiResponse.success("Usuario registrado con éxito", registedUser);
  }
}
