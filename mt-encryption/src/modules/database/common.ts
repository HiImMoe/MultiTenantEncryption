import { TenantRequestContext, RequestContext } from 'src/context/tenant-context';
import { FindOneOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

export class CommonDB<E extends ObjectLiteral> {
  private entity: new () => ObjectLiteral;
  private repo: Repository<E>;
  constructor(entity: new () => ObjectLiteral, repo: Repository<E>) {
    this.entity = entity;
    this.repo = repo;
  }

  async create(data: any): Promise<string> {
    const ctx: TenantRequestContext = RequestContext.get();
    const obj = await this.repo.create([{ ...data, tenantId: ctx.tenantId }]);
    const savedObj = await this.repo.save(obj[0]);
    return savedObj.id;
  }

  async get(where: FindOptionsWhere<E>): Promise<E[]> {
    const ctx: TenantRequestContext = RequestContext.get();
    let whereOptions: FindOptionsWhere<any> = { ...where };
    if (ctx) {
      whereOptions = { ...whereOptions, tenantId: ctx.tenantId };
    }

    const res = await this.repo.find({ where: whereOptions });
    return res;
  }

  async getById(id: string): Promise<E> {
    const ctx: TenantRequestContext = RequestContext.get();
    let where: FindOptionsWhere<any> = { id: id };
    if (ctx) {
      where = { ...where, tenantId: ctx.tenantId };
    }
    const options: FindOneOptions = {
      where,
    };

    const res = await this.repo.findOne(options);
    return res;
  }

  // check if works
  async update(id: string, data: any): Promise<void> {
    const ctx: TenantRequestContext = RequestContext.get();
    let where: FindOptionsWhere<any> = { id: id };
    if (ctx) {
      where = { ...where, tenantId: ctx.tenantId };
    }

    await this.repo.update(where, data);
    return;
  }
}
