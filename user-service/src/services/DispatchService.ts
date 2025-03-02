import { AuthService } from "./User/AuthService";
import { ProfileService } from "./User/ProfileService";
import { ManagementService } from "./User/ManagementService";
import { RoleService } from "./Role/RoleService";

/* 
* Servicio orquestador de funcionalidades en user-service.
*/
export class DispatchService {
  authService = new AuthService();
  profileService = new ProfileService();
  managementService = new ManagementService();
  roleService = new RoleService();
}