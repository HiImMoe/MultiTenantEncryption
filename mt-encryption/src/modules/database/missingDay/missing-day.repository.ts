import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMissingDayDTO } from 'src/dto/missing-days.dto';
import { MissingDayRepositoryDef } from 'src/repository/missing-day.repository.def';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommonDB } from '../common';
import { MissingDaysModel } from '../models/missing-days.model';
import { MissingDay } from './missing-day.entity';

@Injectable()
export class MissingDayRepository extends MissingDayRepositoryDef {
  private readonly common: CommonDB<MissingDay>;
  constructor(@InjectRepository(MissingDay) private missingDayRepo: Repository<MissingDay>) {
    super();
    this.common = new CommonDB(MissingDay, missingDayRepo);
  }

  async createMissingDay(data: CreateMissingDayDTO): Promise<string> {
    return await this.common.create(data);
  }

  async getMissingDays(where: FindOptionsWhere<MissingDay>): Promise<MissingDaysModel[]> {
    return await this.common.get(where);
  }
}
