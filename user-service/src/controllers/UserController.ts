import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from 'dotenv';
import { DispatchService } from "../services/DispatchService";

config();

const SECRET_KEY = process.env.JWT_SECRET; // Usa variables de entorno
export class UserController {
  private userService = new DispatchService();
 
  /* 
  * AUTH => Autentificación
  */
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const response = await this.userService.authService.login(username, password);
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, username, roleId } = req.body;
      const user = await this.userService.authService.registerUser(name, email, password, username, roleId);
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
      console.log('s111');
      
      const { username } = req.query;
      const users = await this.userService.profileService.getUserQuery(username as string | undefined);
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

      const response = await this.userService.managementService.statusUser(username, status);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  
}
