import express from "express";
import dotenv from "dotenv";
import userRoutes from './routes/user.routes'
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Habilita las rutas con prefijo "users"
app.use("/users", userRoutes);

// Middelware para manejo de errores centralizado
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`User Service corriendo en http://localhost:${PORT}`);
});
