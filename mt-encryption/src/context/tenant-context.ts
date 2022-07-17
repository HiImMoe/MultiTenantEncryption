import { nanoid } from 'nanoid';
import * as cls from 'cls-hooked';

export class TenantContext {
  public static nsid = '3281ebb8-b7f8-46c1-a60d-bbb6f5eee5ad';
  public readonly id: string;
  public tenantId: string;
  public encryptionKey: string;

  constructor(tenantId: string, encryptionKey: string) {
    this.id = nanoid();
    this.tenantId = tenantId;
    this.encryptionKey = encryptionKey;
  }

  public static currentTenantContext(): TenantContext | null {
    const session = cls.getNamespace(TenantContext.nsid);
    if (session && session.active) {
      return session.get(TenantContext.name);
    }
    return null;
  }

  public static currentTenantId(): string | null {
    const tenantContext = TenantContext.currentTenantContext();

    if (tenantContext) {
      return tenantContext.tenantId;
    }

    return null;
  }

  public static currentEncryptionKey(): string | null {
    const tenantContext = TenantContext.currentTenantContext();

    if (tenantContext) {
      return tenantContext.encryptionKey;
    }
    return null;
  }
}
