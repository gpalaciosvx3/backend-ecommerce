import { z } from "zod";

export const RegisterUserDTO = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Formato de email inválido"),
  username: z.string().min(1, "El username es obligatorio").regex(/^\S+$/, "El username no puede contener espacios"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/\d/, "Debe contener al menos un número")
    .regex(/[\W_]/, "Debe contener al menos un carácter especial")
});

export const GetUserDTO = z.object({
  username: z.string()
    .trim()
    .min(1, "El username no puede estar vacío")
    .regex(/^\S+$/, "El username no puede contener espacios")
    .optional()
});
