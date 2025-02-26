import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validateDTO } from "../middleware/dtoValidator";
import { RegisterUserDTO, GetUserDTO } from "../dtos/UserDTO";

const router = Router();
const userController = new UserController();

// Rutas de Autenticación
router.post("/register", validateDTO(RegisterUserDTO), userController.createUser);

// Rutas de Perfil
router.get("/", validateDTO(GetUserDTO), userController.getUser);

// Rutas de Administración
router.patch("/desactivate/:username", validateDTO(GetUserDTO), userController.deactivateUser);

export default router;
