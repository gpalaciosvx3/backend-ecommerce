import { z } from "zod";

export const RegisterUserDTO = z.object({
  name: z.string({
      required_error: "Nombre es obligatorio",
      invalid_type_error: "Nombre debe ser una cadena de texto"
    })
    .min(1, "El nombre es obligatorio")
    .max(10, "El nombre del Usuario no puede tener más de 10 caracteres"),
  email: z.string({
      required_error: "Email es obligatorio"
    })
    .min(1, "El email es obligatorio")
    .email("Formato de email inválido"),
  username: z.string({
      required_error: "Username es obligatorio",
      invalid_type_error: "Username debe ser una cadena de texto"
    })
    .min(1, "El username es obligatorio")
    .regex(/^\S+$/, "El username no puede contener espacios"),
  password: z.string({
      required_error: "Password es obligatorio",
      invalid_type_error: "Password debe ser una cadena de texto"
    })
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
    .regex(/\d/, "La contraseña debe contener al menos un número")
    .regex(/[\W_]/, "La contraseña debe contener al menos un carácter especial"),
  status: z.enum(["active", "inactive"], { message: "El estado debe ser 'active' o 'inactive'" })
    .optional(),
  roleName: z.string({
      required_error: "ROL es obligatorio",
      invalid_type_error: "ROL debe ser una cadena de texto"
    }).min(1, "Rol es obligatorio") 
});

export const GetUserDTO = z.object({
  username: z.string()
    .trim()
    .min(1, "El username no puede estar vacío")
    .regex(/^\S+$/, "El username no puede contener espacios")
    .optional()
});

export const UpdateStatusDTO = z.object ({
  username: z.string({
      required_error: "Username es obligatorio",
      invalid_type_error: "Username debe ser una cadena de texto"
    })
    .min(1, "El username es obligatorio")
    .regex(/^\S+$/, "El username no puede contener espacios"),
    status: z.enum(["active", "inactive"], {
        message: "El estado debe ser 'active' o 'inactive'"
    }).refine(value => value !== undefined, {
        message: "El estado es obligatorio"
    })
});

export const LoginUserDTO = z.object ({
  username: z.string()
    .min(1, "El username es obligatorio")
    .regex(/^\S+$/, "El username no puede contener espacios"),
    password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
    .regex(/\d/, "La contraseña debe contener al menos un número")
    .regex(/[\W_]/, "La contraseña debe contener al menos un carácter especial")
});

export const UpdateUserRoleDTO = z.object ({
  username: z.string({
      required_error: "Username es obligatorio",
      invalid_type_error: "Username debe ser una cadena de texto"
    })
    .min(1, "El username es obligatorio")
    .regex(/^\S+$/, "El username no puede contener espacios"),
  roleName: z.string({
      required_error: "ROL es obligatorio",
      invalid_type_error: "ROL debe ser una cadena de texto"
    })
    .min(1, "Rol es obligatorio") 
});