import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Middleware para validar y encriptar datos antes de guardarlos
prisma.$use(async (params: any, next: any) => {
  if (params.model === "User") {
    if (params.action === "create" || params.action === "update") {
      const data = params.args.data;

      // Validar formato de email
      if (data.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
        throw new Error("USR => Formato de email inválido");
      }

      // Encriptar contraseña antes de guardar
      if (data.password) {
        const saltRounds = 10;
        data.password = await bcrypt.hash(data.password, saltRounds);
      }
    }
  }

  return next(params);
});

export default prisma;
