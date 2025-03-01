import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();
 
  /* 
  * AUTH => Autentificación
  */
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, username } = req.body;
      const user = await this.userService.authService.registerUser(name, email, password, username);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  /* 
  * PROF => Obtiene usuarios
  */
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.query;
      const users = await this.userService.profileService.getUserQuery(username as string | undefined);
      res.status(201).json(users);
    } catch (error) {
      next(error);
    }
  
  }
  
  /* 
  * MANG => Status Usuario
  */
  managmentStatusUser = async (req: Request, res: Response, next: NextFunction) => {
    try {     
      const { username } = req.params;
      const { status } = req.body;

      const response = await this.userService.managementService.statusUser(username, status);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  
}
