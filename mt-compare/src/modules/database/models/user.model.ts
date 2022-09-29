import { UserDTO } from 'src/dto/user.dto';

export class UserModel extends UserDTO {
  keycloakId: string;
  tenantId: string;
}
