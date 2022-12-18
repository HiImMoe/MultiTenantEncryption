import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserContextDTO } from 'src/dto/context/user-context.dto';
import { CreateUserDTO, UserDTO } from 'src/dto/user.dto';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UserService } from 'src/service/user/user.service';
import { ApiCreatedResponse, ApiOAuth2, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiOAuth2([])
@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Id of the new created user',
    type: String,
  })
  @Post()
  async createUser(@Body() newUser: CreateUserDTO): Promise<string> {
    return this.userService.createUser(newUser);
  }

  @ApiResponse({ description: 'A list of users' })
  @Get()
  async getUsers(): Promise<UserDTO[]> {
    return await this.userService.getUsers();
  }

  @ApiParam({ name: 'userId', example: '11e1577f-0f6c-4d6b-9725-9b8fc246e4a2' })
  @ApiOkResponse({ description: 'A single user' })
  @Get(':userId')
  async getUserById(@Param() context: UserContextDTO): Promise<UserDTO> {
    return await this.userService.getUserById(context.userId);
  }
}
