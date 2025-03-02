import { Router } from "express";
/* Controller */
import { RoleController } from "../controllers/RoleController";
/* Middleware */
import { groupMiddleware } from "../middleware/groupMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { cacheMiddleware } from "../middleware/cacheMiddleware";
import { validateDTO } from "../middleware/dtoValidator";
/* DTO's */
import { CreateRoleDTO, UpdateRoleDTO, GetRoleDTO, DeleteRoleDTO } from "../dtos/RoleDTO";

const router = Router();
const roleController = new RoleController();

/* 
* Grupo de middlewares para rutas protegidas de Administrador
*   - Requiere autenticación
*   - Requiere que el Usuario tenga el rol Admin
*/
const protectedAdminRouter = Router();
groupMiddleware([authMiddleware,adminMiddleware], protectedAdminRouter);

// Registra Rol
protectedAdminRouter.post("/register", validateDTO(CreateRoleDTO), roleController.createRole);
// Actualizar Rol
protectedAdminRouter.patch("/update/:id", validateDTO(UpdateRoleDTO), roleController.updateRole);
// Elimina rol
protectedAdminRouter.delete("/delete/:name", validateDTO(DeleteRoleDTO),roleController.deleteRole);

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
router.use("/admin", protectedAdminRouter);
router.use("/cache", cacheRouter);

export default router;
