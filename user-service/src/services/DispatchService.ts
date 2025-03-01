import { AuthService } from "./AuthService";
import { ProfileService } from "./ProfileService";
import { ManagementService } from "./ManagementService";
import { RoleService } from "./RoleService";

/* 
* Servicio orquestador de funcionalidades en user-service.
*/
export class DispatchService {
  authService = new AuthService();
  profileService = new ProfileService();
  managementService = new ManagementService();
  roleService = new RoleService();
}