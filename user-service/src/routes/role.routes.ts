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

protectedRouter.get("/", roleController.getRoles);

protectedRouter.post("/register", validateDTO(CreateRoleDTO), roleController.createRole);

protectedRouter.patch("/:id", validateDTO(UpdateRoleDTO), roleController.updateRole);

protectedRouter.delete("/:id", roleController.deleteRole);

/* Montamos las rutas */
// router.use("/", publicRouter);
router.use("/", protectedRouter);

export default router;
