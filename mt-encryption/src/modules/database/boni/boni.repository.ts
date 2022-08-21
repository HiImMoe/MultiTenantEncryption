import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoniDTO } from 'src/dto/boni.dto';
import { BoniRepositoryDef } from 'src/repository/boni.repository.def';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommonDB } from '../common';
import { BoniModel } from '../models/boni.model';
import { Boni } from './boni.entity';

@Injectable()
export class BoniRepository extends BoniRepositoryDef {
  private readonly common: CommonDB<Boni>;
  constructor(@InjectRepository(Boni) private boniRepo: Repository<Boni>) {
    super();
    this.common = new CommonDB(Boni, boniRepo);
  }

  async createBoni(data: CreateBoniDTO): Promise<string> {
    return await this.common.create(data);
  }

  async getBoni(where: FindOptionsWhere<Boni>): Promise<BoniModel[]> {
    return await this.common.get(where);
  }
}
