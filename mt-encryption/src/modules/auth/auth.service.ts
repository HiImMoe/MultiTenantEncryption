import { Injectable } from '@nestjs/common';
import { UserService } from 'src/service/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  public async loadUserByJwtToken() {
    return true;
  }
}
