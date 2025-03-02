import { Router } from "express";
/* Controller */
import { RoleController } from "../controllers/RoleController";
/* Middleware */
import { groupMiddleware } from "../middleware/groupMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { cacheMiddleware } from "../middleware/cacheMiddleware";
import { validateDTO } from "../middleware/dtoValidator";
/* DTO's */
import { CreateRoleDTO, UpdateRoleDTO, GetRoleDTO, DeleteRoleDTO } from "../dtos/RoleDTO";

const router = Router();
const roleController = new RoleController();

/* 
* Grupo de middlewares para rutas protegidas 
*   - Requiere autenticación
*/
const protectedRouter = Router();
groupMiddleware([authMiddleware], protectedRouter);

// Registra Rol
protectedRouter.post("/register", validateDTO(CreateRoleDTO), roleController.createRole);
// Actualizar Rol
protectedRouter.patch("/update/:id", validateDTO(UpdateRoleDTO), roleController.updateRole);
// Elimina rol
protectedRouter.delete("/delete/:name", validateDTO(DeleteRoleDTO),roleController.deleteRole);

/* 
* Grupo de middlewares para rutas cacheadas 
*   - Requiere Autenticación
*   - Obtiene data de Caché si está disponible
*/
const cacheRouter = Router();
groupMiddleware([authMiddleware,cacheMiddleware], cacheRouter);

// Obtener roles
cacheRouter.get("/", validateDTO(GetRoleDTO), roleController.getRoles);

/* Montamos las rutas */
router.use("/", protectedRouter);
router.use("/", cacheRouter);

export default router;
