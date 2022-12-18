import { TenantRequestContext, RequestContext } from 'src/context/tenant-context';
import { PagingDTO } from 'src/dto/common';
import { FindOneOptions, FindOptionsWhere, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';

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

  async get(builder: SelectQueryBuilder<E>, paging?: PagingDTO): Promise<{ results: E[]; totalCount: number }> {
    const ctx: TenantRequestContext = RequestContext.get();
    if (ctx) {
      builder.andWhere({ tenantId: ctx.tenantId });
    }
    if (paging && paging.page && paging.pageSize) {
      builder.skip(paging.pageSize * paging.page);
      builder.take(paging.pageSize);
    }
    const [results, count] = await builder.getManyAndCount();
    return {
      results,
      totalCount: count,
    };
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
