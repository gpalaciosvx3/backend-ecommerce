import express from "express";
import dotenv from "dotenv";
import userRoutes from './routes/user.routes'
import roleRoutes from "./routes/role.routes";
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para parsear JSON
app.use(express.json());

// Habilita las rutas con prefijo "users"
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);

// Middelware para manejo de errores centralizado
app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`User Service corriendo en http://localhost:${PORT}`);
});
