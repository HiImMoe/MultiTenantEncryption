import { Injectable } from '@nestjs/common';
import { scrypt } from 'crypto';
import { CreateUserDTO, UserDTO } from 'src/dto/user.dto';
import { UserModel } from 'src/modules/database/models/user.model';
import { UserRepositoryDef } from 'src/repository/user.repository.def';
import { promisify } from 'util';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepositoryDef) {}

  async createUser(newUser: CreateUserDTO): Promise<string> {
    // const key = ((await promisify(scrypt)('test', 'salt', 32)) as Buffer).toString('hex');
    const userId = await this.userRepo.createUser(newUser);
    return userId;
  }

  async getUserById(id: string): Promise<UserDTO> {
    const user = await this.userRepo.getUserById(id);
    return user;
  }

  async getUserByIdpId(id: string): Promise<UserModel> {
    return await this.userRepo.getUserByIdpId(id);
  }

  async getUsers(): Promise<UserDTO[]> {
    const users = await this.userRepo.getUsers();
    return users;
  }
}
