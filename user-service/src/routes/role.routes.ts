import { Router } from "express";
import { RoleController } from "../controllers/RoleController";
import { groupMiddleware } from "../middleware/groupMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateDTO } from "../middleware/dtoValidator";
import { CreateRoleDTO, UpdateRoleDTO } from "../dtos/RoleDTO";

const router = Router();
const roleController = new RoleController();

/* 
* Grupo de middlewares para rutas protegidas (Requiere autenticación)
*/
const protectedRouter = Router();
groupMiddleware([authMiddleware], protectedRouter);

router.get("/", roleController.getRoles);

router.post("/register", validateDTO(CreateRoleDTO), roleController.createRole);

router.patch("/:id", validateDTO(UpdateRoleDTO), roleController.updateRole);

router.delete("/:id", roleController.deleteRole);

export default router;
