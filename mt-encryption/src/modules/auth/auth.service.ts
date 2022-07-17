import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/service/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('auth service');
    const user = await this.userService.getUsers();
    return user[0];
  }

  async login(user: any) {
    const payload = { firstName: user.firstName, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
