import { z } from "zod";

export const RegisterUserDTO = z.object({
  name: z.string()
    .min(1, "El nombre es obligatorio"),
  email: z.string()
    .email("Formato de email inválido"),
  username: z.string()
    .min(1, "El username es obligatorio")
    .regex(/^\S+$/, "El username no puede contener espacios"),
  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
    .regex(/\d/, "La contraseña debe contener al menos un número")
    .regex(/[\W_]/, "La contraseña debe contener al menos un carácter especial")
});

export const GetUserDTO = z.object({
  username: z.string()
    .trim()
    .min(1, "El username no puede estar vacío")
    .regex(/^\S+$/, "El username no puede contener espacios")
    .optional()
});

export const UpdateStatusDTO = z.object ({
  username: z.string()
    .min(1, "El username es obligatorio")
    .regex(/^\S+$/, "El username no puede contener espacios"),
  status: z.enum(["active", "inactive"], { message: "El estado debe ser 'active' o 'inactive'" })
    .optional()
});