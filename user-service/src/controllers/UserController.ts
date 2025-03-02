import { Request, Response, NextFunction } from "express";
import { config } from 'dotenv';
import { DispatchService } from "../services/DispatchService";

config();

const SECRET_KEY = process.env.JWT_SECRET; // Usa variables de entorno
export class UserController {
  private dispatchService = new DispatchService();
 
  /* 
  * AUTH => Autentificación
  */
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const response = await this.dispatchService.authService.login(username, password);
    
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, username, roleName } = req.body;
      const user = await this.dispatchService.authService.registerUser(name, email, password, username, roleName);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  /* 
  * PROF => Perfiles de Usuario
  */
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {          
      const users = await this.dispatchService.profileService.obtainUser(req);

      res.status(201).json(users);
    } catch (error) {
      next(error);
    }
  
  }
  
  /* 
  * MANG => Manejo de Usuarios
  */
  managmentStatusUser = async (req: Request, res: Response, next: NextFunction) => {
    try {     
      const { username } = req.params;
      const { status } = req.body;

      const response = await this.dispatchService.managementService.statusUser(username, status);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  managmentRoleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {     
      const { username } = req.params;
      const { roleName } = req.body;
      const token = req.headers.authorization?.split(" ")[1]; 

      const response = await this.dispatchService.managementService.updateUserRole(username, roleName,token);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  
}
