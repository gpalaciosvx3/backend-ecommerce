import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validateDTO } from "../middleware/dtoValidator";
import { RegisterUserDTO, GetUserDTO, UpdateStatusDTO } from "../dtos/UserDTO";

const router = Router();
const userController = new UserController();

// Auntenticación
router.post("/register", validateDTO(RegisterUserDTO), userController.createUser);

// Gestión de Perfiles
router.get("/", validateDTO(GetUserDTO), userController.getUser);

// Gestión de Cuenta
router.patch("/status/:username", validateDTO(UpdateStatusDTO), userController.managmentStatusUser);

export default router;
