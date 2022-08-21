import { CreateBoniDTO } from 'src/dto/boni.dto';
import { Boni } from 'src/modules/database/boni/boni.entity';
import { BoniModel } from 'src/modules/database/models/boni.model';
import { FindOptionsWhere } from 'typeorm';

export abstract class BoniRepositoryDef {
  abstract createBoni(data: CreateBoniDTO): Promise<string>;
  abstract getBoni(where: FindOptionsWhere<Boni>): Promise<BoniModel[]>;
}
