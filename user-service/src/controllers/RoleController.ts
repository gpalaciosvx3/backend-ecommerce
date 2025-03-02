import { Request, Response, NextFunction } from "express";
import { DispatchService } from "../services/DispatchService";

export class RoleController {
  private dispatchService = new DispatchService();

  /* 
  * MANG => Manejo de Roles
  */
  createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const role = await this.dispatchService.roleService.createRole(name);

      res.status(201).json(role);
    } catch (error) {
      next(error);
    }
  };

  getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await this.dispatchService.roleService.obtainRole(req);

      res.status(201).json(roles);
    } catch (error) {
      next(error);
    }
  };

  updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedRole = await this.dispatchService.roleService.updateRole(id, name);

      res.status(201).json(updatedRole);
    } catch (error) {
      next(error);
    }
  };

  deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.params;
      const deleted = await this.dispatchService.roleService.deleteRole(name);

      res.json(deleted);
    } catch (error) {
      next(error);
    }
  };
}
