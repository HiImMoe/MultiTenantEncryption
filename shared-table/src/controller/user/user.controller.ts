import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserContextDTO } from 'src/dto/context/user-context.dto';
import { CreateUserDTO, UserDTO } from 'src/dto/user.dto';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UserService } from 'src/service/user/user.service';

@UseGuards(JwtAuthGuard)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @Post()
  async createUser(@Body() newUser: CreateUserDTO): Promise<string> {
    return this.userService.createUser(newUser);
  }

  @Get()
  async getUsers(): Promise<UserDTO[]> {
    return await this.userService.getUsers();
  }

  @Get(':userId')
  async getUserById(@Param() context: UserContextDTO): Promise<UserDTO> {
    return await this.userService.getUserById(context.userId);
  }
}
