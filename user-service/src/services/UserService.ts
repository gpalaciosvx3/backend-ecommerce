import { AuthService } from "./AuthService";
import { ProfileService } from "./ProfileService";
import { ManagementService } from "./ManagementService";

/* 
* Servicio orquestador de funcionalidades en user-service.
*/
export class UserService {
  authService = new AuthService();
  profileService = new ProfileService();
  managementService = new ManagementService();
}