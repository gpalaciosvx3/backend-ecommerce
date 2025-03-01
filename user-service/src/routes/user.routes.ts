import { Router } from "express";
/* Controller */
import { UserController } from "../controllers/UserController";
/* Middleware's */
import { groupMiddleware } from "../middleware/groupMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateDTO } from "../middleware/dtoValidator";
/* DTO's */
import { RegisterUserDTO, GetUserDTO, UpdateStatusDTO, LoginUserDTO } from "../dtos/UserDTO";

const router = Router();
const userController = new UserController();

/* 
* Grupo de middlewares para rutas públicas (No requieren autenticación) 
*/
const publicRouter = Router();
// AUTH
publicRouter.post("/login", validateDTO(LoginUserDTO), userController.login);

// PROF

// MANG

/* 
* Grupo de middlewares para rutas protegidas (Requiere autenticación)
*/
const protectedRouter = Router();
groupMiddleware([authMiddleware], protectedRouter);
// AUTH
protectedRouter.post("/register", validateDTO(RegisterUserDTO), userController.createUser);
// PROF
protectedRouter.get("/", validateDTO(GetUserDTO), userController.getUser);
// MANG
protectedRouter.patch("/status/:username", validateDTO(UpdateStatusDTO), userController.managmentStatusUser);

/* Montamos las rutas */
router.use("/", publicRouter);
router.use("/", protectedRouter);

export default router;
