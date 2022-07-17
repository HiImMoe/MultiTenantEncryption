import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UserDTO } from 'src/dto/user.dto';
import { UserRepositoryDef } from 'src/repository/user.repository.def';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepositoryDef) {}

  async createUser(newUser: CreateUserDTO): Promise<UserDTO> {
    // const key = ((await promisify(scrypt)('test', 'salt', 32)) as Buffer).toString('hex');
    const user = await this.userRepo.createUser(newUser);
    return user;
  }

  async getUserById(id: string): Promise<UserDTO> {
    const user = await this.userRepo.getUserById(id);
    return user;
  }

  async getUsers(): Promise<UserDTO[]> {
    const users = await this.userRepo.getUsers();
    return users;
  }
}
