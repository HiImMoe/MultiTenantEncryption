import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/user.dto';
import { EncryptionRepositoryDef } from 'src/repository/encryption.repository.def';
import { UserRepositoryDef } from 'src/repository/user.repository.def';
import { Repository } from 'typeorm';
import { CommonDB } from '../common';
import { UserModel } from '../models/user.model';
import { User } from './user.entity';
@Injectable()
export class UserRepository extends UserRepositoryDef {
  private readonly common: CommonDB<User>;

  constructor(@InjectRepository(User) private userRepo: Repository<User>, private encryptionRepo: EncryptionRepositoryDef) {
    super();
    this.common = new CommonDB(User, userRepo);
  }

  mapToModel(u: User): UserModel {
    return {
      id: u.id,
      keycloakId: u.keycloakId,
      tenantId: u.tenantId,
      firstName: u.firstName,
      lastName: u.lastName,
      isActive: u.isActive,
      secret: u.secret,
    };
  }

  async createUser(userData: CreateUserDTO): Promise<string> {
    const user = await this.userRepo.create(userData);
    const newUser = await this.userRepo.save(user);
    return newUser.id;
  }

  async getUsers(): Promise<UserModel[]> {
    const users = await this.userRepo.find();
    return users;
  }

  async getUserByIdpId(id: string): Promise<UserModel> {
    const user = await this.userRepo.findOne({ where: { keycloakId: id } });
    return this.mapToModel(user);
  }

  async getUserById(id: string): Promise<UserModel> {
    const user = await this.userRepo.findOne({ where: { id: id } });
    return this.mapToModel(user);
  }
}
