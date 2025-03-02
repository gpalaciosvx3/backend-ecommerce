import { User } from "./User";
import { Role } from "./Role";

/**
 * Modelo extendido para los datos de autenticación
 */
export interface AuthData extends Partial<User> {
  password?: string;
  roleName?: string;
  userFormPassword?: string;
  userFormStatus?: string;
  role?: Omit<Role, "users"> & { roleId: string; roleName: string; roleStatus: string; roleCreatedAt: Date };
}
