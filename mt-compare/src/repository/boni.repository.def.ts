import { CreateBoniDTO } from 'src/dto/boni.dto';
import { BoniModel } from 'src/modules/database/models/boni.model';

export abstract class BoniRepositoryDef {
  abstract createBoni(data: CreateBoniDTO): Promise<string>;
  abstract getBoni(employeeId: string): Promise<BoniModel[]>;
}
