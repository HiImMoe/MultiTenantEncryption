import { Injectable } from '@nestjs/common';
import { CreateMissingDayDTO } from 'src/dto/missing-days.dto';
import { MissingDayRepositoryDef } from 'src/repository/missing-day.repository.def';

@Injectable()
export class MissingDayService {
  constructor(private missingDayRepo: MissingDayRepositoryDef) {}

  async createMissingDay(data: CreateMissingDayDTO) {
    return await this.missingDayRepo.createMissingDay(data);
  }

  async getMissingDays() {
    return await this.missingDayRepo.getMissingDays({});
  }
}
