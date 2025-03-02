import { Router } from "express";
/* Controller */
import { UserController } from "../controllers/UserController";
/* Middleware's */
import { groupMiddleware } from "../middleware/groupMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { cacheMiddleware } from "../middleware/cacheMiddleware";
import { validateDTO } from "../middleware/dtoValidator";
/* DTO's */
import { RegisterUserDTO, GetUserDTO, UpdateStatusDTO, LoginUserDTO } from "../dtos/UserDTO";

const router = Router();
const userController = new UserController();

/* 
* Grupo de middlewares para rutas públicas 
*   - No requieren autenticación 
*/
const publicRouter = Router();
// Login
publicRouter.post("/login", validateDTO(LoginUserDTO), userController.login);

/* 
* Grupo de middlewares para rutas protegidas de Administrador
*   - Requiere autenticación
*   - Requiere que el Usuario tenga el rol Admin
*/
const protectedAdminRouter = Router();
groupMiddleware([authMiddleware,adminMiddleware], protectedAdminRouter);

// Registro
protectedAdminRouter.post("/register", validateDTO(RegisterUserDTO), userController.createUser);
// Maneja Status
protectedAdminRouter.patch("/status/:username", validateDTO(UpdateStatusDTO), userController.managmentStatusUser);

/* 
* Grupo de middlewares para rutas cacheadas 
*   - Requiere Autenticación
*   - Obtiene data de Caché si está disponible
*/
const cacheRouter = Router();
groupMiddleware([authMiddleware, cacheMiddleware], cacheRouter);

// GetUsuarios
cacheRouter.get("/", validateDTO(GetUserDTO), userController.getUser);

/* Montamos las rutas */
router.use("/public", publicRouter);
router.use("/admin", protectedAdminRouter);
router.use("/cache", cacheRouter);

export default router;
