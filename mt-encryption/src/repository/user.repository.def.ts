import { CreateUserDTO } from 'src/dto/user.dto';
import { User } from 'src/modules/database/user/user.entity';

export abstract class UserRepositoryDef {
  abstract createUser(userData: CreateUserDTO): Promise<User>;
  abstract getUsers(): Promise<User[]>;
  abstract getUserById(id: string): Promise<User>;
}
