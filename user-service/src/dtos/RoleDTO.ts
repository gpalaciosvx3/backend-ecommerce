import { z } from "zod";

export const CreateRoleDTO = z.object({
  name: z.string({
      required_error: "Nombre es obligatorio",
      invalid_type_error: "Nombre debe ser una cadena de texto"
    })
    .min(1, "El nombre del Rol es obligatorio")
    .max(10, "El nombre del Rol no puede tener más de 10 caracteres"),
  status: z.enum(["active", "inactive"], { message: "El estado debe ser 'active' o 'inactive'" })
    .optional()
});

export const UpdateRoleDTO = z.object ({
  name: z.string({
      required_error: "Nombre es obligatorio",
      invalid_type_error: "Nombre debe ser una cadena de texto"
    })
    .min(1, "El nombre del Rol es obligatorio")
    .max(10, "El nombre del Rol no puede tener más de 10 caracteres"),
  status: z.enum(["active", "inactive"], { message: "El estado debe ser 'active' o 'inactive'" })
    .optional()
});

export const GetRoleDTO = z.object({
  name: z.string({
      required_error: "Nombre es obligatorio",
      invalid_type_error: "Nombre debe ser una cadena de texto"
    })
    .min(1, "El nombre del Rol es obligatorio")
    .max(10, "El nombre del Rol no puede tener más de 10 caracteres")
    .optional()
});

