import { CreateMissingDayDTO } from 'src/dto/missing-days.dto';
import { MissingDay } from 'src/modules/database/missingDay/missing-day.entity';
import { MissingDaysModel } from 'src/modules/database/models/missing-days.model';
import { FindOptionsWhere } from 'typeorm';

export abstract class MissingDayRepositoryDef {
  abstract createMissingDay(data: CreateMissingDayDTO): Promise<string>;
  abstract getMissingDays(where: FindOptionsWhere<MissingDay>): Promise<MissingDaysModel[]>;
}
