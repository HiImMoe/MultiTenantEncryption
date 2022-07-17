import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantContextProvider } from 'src/context/tenant-context.provider';
import { CreateUserDTO } from 'src/dto/user.dto';
import { EncryptionRepositoryDef } from 'src/repository/encryption.repository.def';
import { UserRepositoryDef } from 'src/repository/user.repository.def';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends UserRepositoryDef {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private encryptionRepo: EncryptionRepositoryDef,
    private tenantContextProvider: TenantContextProvider,
  ) {
    super();
  }

  async createUser(userData: CreateUserDTO): Promise<User> {
    console.log(this.tenantContextProvider.getTenantId(), this.tenantContextProvider.getEncryptionKey());
    const key = 'd85117047fd06d3afa79b6e44ee3a52eb426fc24c3a2e3667732e8da0342b4da';
    const tenantId = '1';
    const encUser = this.encryptionRepo.encrypt({ ...userData, tenantId }, ['secret'], key);

    const user = await this.userRepo.create(encUser as CreateUserDTO);
    const newUser = await this.userRepo.save(user);
    return newUser;
  }

  async getUsers(): Promise<User[]> {
    const key = 'd85117047fd06d3afa79b6e44ee3a52eb426fc24c3a2e3667732e8da0342b4da';
    const tenantId = '1';
    const users = await this.userRepo.find({
      where: {
        tenantId,
      },
    });
    const decUsers = [];
    users.forEach(user => {
      decUsers.push(this.encryptionRepo.decrypt(user, ['secret'], key));
    });
    return decUsers;
  }

  async getUserById(id: string): Promise<User> {
    const key = 'd85117047fd06d3afa79b6e44ee3a52eb426fc24c3a2e3667732e8da0342b4da';
    const user = await this.userRepo.findOneBy({
      id,
    });
    const decUser = this.encryptionRepo.decrypt(user, ['secret'], key);
    return decUser;
  }
}
