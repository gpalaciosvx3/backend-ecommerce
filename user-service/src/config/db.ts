import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

prisma.$use(async (params: any, next: any) => {
  const { model, action, args } = params;

  // **Validaciones para User**
  if (model === "User" && (action === "create" || action === "update")) {
    const data = args.data;

    // Validar formato de email
    if (data.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
      throw new Error("USR => Formato de email inválido");
    }

    // Validar que status solo sea "active" o "inactive"
    if (data.status && !["active", "inactive"].includes(data.status)) {
      throw new Error("USR => El estado debe ser 'active' o 'inactive'");
    }

    // Encriptar contraseña antes de guardarla
    if (data.password) {
      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);
    }
  }

  // **Validaciones para Role**
  if (model === "Role" && (action === "create" || action === "update")) {
    const data = args.data;

    // Validar que name tenga máximo 10 caracteres
    if (data.name && data.name.length > 10) {
      throw new Error("ROL => El nombre del Rol no puede tener más de 10 caracteres");
    }

    // Validar que status solo sea "active" o "inactive"
    if (data.status && !["active", "inactive"].includes(data.status)) {
      throw new Error("ROL => El estado debe ser 'active' o 'inactive'");
    }
  }

  return next(params);
});

export default prisma;
