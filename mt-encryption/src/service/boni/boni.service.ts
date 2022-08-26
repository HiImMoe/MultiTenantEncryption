import { Injectable } from '@nestjs/common';
import { CreateBoniDTO } from 'src/dto/boni.dto';
import { BoniModel } from 'src/modules/database/models/boni.model';
import { BoniRepositoryDef } from 'src/repository/boni.repository.def';

@Injectable()
export class BoniService {
  constructor(private boniRepo: BoniRepositoryDef) {}

  async createBoni(data: CreateBoniDTO) {
    return await this.boniRepo.createBoni(data);
  }

  async getBoni(employeeId: string): Promise<BoniModel[]> {
    return await this.boniRepo.getBoni(employeeId);
  }
}
