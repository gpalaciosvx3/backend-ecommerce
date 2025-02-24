import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

// Rutas de Autenticación
router.post("/register", userController.createUser);

// Rutas de Perfil
router.get("/", userController.getUser);
router.get("/profile/:email", userController.getProfile);

// Rutas de Administración
router.patch("/desactivate/:email", userController.deactivateUser);

export default router;
