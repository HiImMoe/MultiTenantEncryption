import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UserService } from 'src/service/user/user.service';
import { UserModel } from '../database/models/user.model';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  public async loadUserByJwtToken(sub: string): Promise<UserModel> {
    return this.userService.getUserByIdpId(sub);
  }
}
