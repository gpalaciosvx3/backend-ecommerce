import { config } from 'dotenv';
import jwt from "jsonwebtoken";
/* Repositorios */
import { UserRepository } from "../../repositories/UserRepository";
import { RoleRepository } from "../../repositories/RoleRepository";
/* Validations */
import { UsernameNotExistsValidation } from "../../validations/UsernameNotExistsValidation";
import { UsernameExistsValidation } from "../../validations/UsernameExistsValidation";
import { RoleExistsValidation } from "../../validations/RoleExistsValidation";
import { PasswordMatchValidation } from "../../validations/PasswordMatchValidation";
/* Utils */
import { ApiResponse } from "../../utils/ApiResponse";
/* Models */
import { AuthData } from "../../models/AuthData";

config(); 

const JWT_SECRET = process.env.JWT_SECRET as string;
export class AuthService {
  private userRepository = new UserRepository();
  private roleRepository = new RoleRepository();

  /* 
  * Genera JWT para el usuario 
  */
  async generateToken(userId: string, roleId: string) {   
    const roleName = await this.roleRepository.findRoleNameById(roleId);
    const isAdmin = roleName === "Admin";
    
    return jwt.sign(
      { userId, isAdmin: roleName === "admin" }, 
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
  }

  /* 
  * Login
  */
  async login(username: string, userFormPassword: string) {
    const data: AuthData = { username, userFormPassword };

    // *1. Crear cadena de validaciones*
    const usernameValidation = new UsernameExistsValidation(this.userRepository); // Valida que usuario exista - Exitende el user
    const roleValidation = new RoleExistsValidation(this.roleRepository); // Valida que rol exista - Extiende el rol modificado
    const passwordValidation = new PasswordMatchValidation(); // Valida que la clave ingresada corresponda al usuario

    usernameValidation.setNext(roleValidation);
    roleValidation.setNext(passwordValidation);
    
    // *2. Ejecutar validaciones en cadena*
    await usernameValidation.validate(data);

    // *3. Genera Token*
    const token = await this.generateToken(data.id!, data.role!.roleId);
    
    return ApiResponse.success("Logeado con éxito", { token, isAdmin: data.role!.roleName.toLowerCase() === "admin"  });
  }

  /* 
  * Registra usuario
  */
  async registerUser(name: string, email: string, password: string, username: string, roleName: string) {
    const data: AuthData = { name, email, password, username, roleName };
        
    // *1. Crear cadena de validaciones* 
    const usernameValidation = new UsernameNotExistsValidation(this.userRepository); // Valida que usuario NO exista 
    const roleValidation = new RoleExistsValidation(this.roleRepository); // Valida que rol exista - Extiende el rol modificado
  
    usernameValidation.setNext(roleValidation);
  
    // *2. Ejecutar validaciones en cadena*
    await usernameValidation.validate(data);    

    // *3. Registra usuario*
    const registedUser = await this.userRepository.createUser(name, email, password, username, data.role!.roleId);
  
    return ApiResponse.success("Usuario registrado con éxito", registedUser);
  }
  
}
