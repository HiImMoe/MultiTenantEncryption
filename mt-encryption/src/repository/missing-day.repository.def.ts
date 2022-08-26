import { CreateMissingDayDTO } from 'src/dto/missing-days.dto';
import { MissingDaysModel } from 'src/modules/database/models/missing-days.model';

export abstract class MissingDayRepositoryDef {
  abstract createMissingDay(data: CreateMissingDayDTO): Promise<string>;
  abstract getMissingDays(employeeId: string): Promise<MissingDaysModel[]>;
}
