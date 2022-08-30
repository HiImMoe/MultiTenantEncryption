import { CreateUserDTO } from 'src/dto/user.dto';
import { UserModel } from 'src/modules/database/models/user.model';

export abstract class UserRepositoryDef {
  abstract createUser(userData: CreateUserDTO): Promise<string>;
  abstract getUsers(): Promise<UserModel[]>;
  abstract getUserByIdpId(id: string): Promise<UserModel>;
  abstract getUserById(id: string): Promise<UserModel>;
}
