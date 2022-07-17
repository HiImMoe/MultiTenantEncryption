import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { UserContextDTO } from 'src/dto/context/user-context.dto';
import { CreateUserDTO, UserDTO } from 'src/dto/user.dto';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { UserService } from 'src/service/user/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() newUser: CreateUserDTO): Promise<UserDTO> {
    return await this.userService.createUser(newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Get()
  async getUsers(): Promise<UserDTO[]> {
    return await this.userService.getUsers();
  }

  @Get(':userId')
  async getUserById(@Param() context: UserContextDTO): Promise<UserDTO> {
    return await this.userService.getUserById(context.userId);
  }
}
