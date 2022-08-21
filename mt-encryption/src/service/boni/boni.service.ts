import { Injectable } from '@nestjs/common';
import { CreateBoniDTO } from 'src/dto/boni.dto';
import { BoniRepositoryDef } from 'src/repository/boni.repository.def';

@Injectable()
export class BoniService {
  constructor(private boniRepo: BoniRepositoryDef) {}

  async createBoni(data: CreateBoniDTO) {
    return await this.boniRepo.createBoni(data);
  }

  async getBoni() {
    return await this.boniRepo.getBoni({});
  }
}
