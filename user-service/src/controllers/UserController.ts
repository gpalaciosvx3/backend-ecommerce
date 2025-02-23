import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();
 
  /* 
  * Crea usuario
  */
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const user = await this.userService.authService.registerUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  /* 
  * Obtiene perfil de Usuario
  */
  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;
      const profile = await this.userService.profileService.getUserProfile(email);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }
  
  /* 
  * Desactiva Usuario
  */
  deactivateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;
      const response = await this.userService.managementService.deactivateUser(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
