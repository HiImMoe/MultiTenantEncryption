import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, CreateUserWithTenant } from 'src/dto/user.dto';
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
    const userId = await this.common.create(userData);
    return userId;
  }

  async getUsers(): Promise<UserModel[]> {
    const key = 'd85117047fd06d3afa79b6e44ee3a52eb426fc24c3a2e3667732e8da0342b4da';
    const tenantId = '1';
    const users = await this.userRepo.find({
      where: {
        tenantId,
      },
    });
    const decUsers = [];
    users.forEach(user => {
      decUsers.push(this.encryptionRepo.dec(user, ['secret'], key));
    });
    return decUsers;
  }

  async getUserByIdpId(id: string): Promise<UserModel> {
    const user = await this.common.get({ keycloakId: id });
    return this.mapToModel(user[0]);
  }

  async getUserById(id: string): Promise<UserModel> {
    const user = await this.common.getById(id);
    return this.mapToModel(user);
  }
}
