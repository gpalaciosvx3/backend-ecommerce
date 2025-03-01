import { Request, Response, NextFunction } from "express";
import { RoleService } from "../services/RoleService";

export class RoleController {
  private roleService = new RoleService();

  /* 
  * MANG => Manejo de Roles
  */
  createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const role = await this.roleService.createRole(name);

      res.status(201).json(role);
    } catch (error) {
      next(error);
    }
  };

  getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await this.roleService.getRoles();

      res.json(roles);
    } catch (error) {
      next(error);
    }
  };

  updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedRole = await this.roleService.updateRole(id, name);

      res.status(201).json(updatedRole);
    } catch (error) {
      next(error);
    }
  };

  deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleted = await this.roleService.deleteRole(id);

      res.json(deleted);
    } catch (error) {
      next(error);
    }
  };
}
