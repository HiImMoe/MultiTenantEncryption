import { UserDTO } from 'src/dto/user.dto';

export interface UserRequest extends Request {
  user: UserDTO;
}
