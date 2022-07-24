import { TenantContextProvider } from 'src/context/tenant-context.provider';
import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm';

interface TenantData {
  tenantId: string;
  encKey: string;
}

export class CommonDB<E extends ObjectLiteral> {
  private entity: new () => ObjectLiteral;
  private repo: Repository<E>;
  constructor(private tenantContextProvider: TenantContextProvider, entity: new () => ObjectLiteral, repo: Repository<E>) {
    this.entity = entity;
    this.repo = repo;
  }

  async getById(id: string): Promise<E> {
    const { tenantId, encKey } = this.getTenantData();
    const options: FindOneOptions = {
      where: {
        id,
        tenantId: 1,
      },
    };

    const res = await this.repo.findOne(options);
    return res;
  }

  getTenantData(): TenantData {
    console.log('tenantData', this.tenantContextProvider.getTenantId(), this.tenantContextProvider.getEncryptionKey());
    return { tenantId: this.tenantContextProvider.getTenantId(), encKey: this.tenantContextProvider.getEncryptionKey() };
  }
}
