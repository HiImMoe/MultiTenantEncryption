import { Injectable } from '@nestjs/common';
import { TenantContext } from './tenant-context';

@Injectable()
export class TenantContextProvider {
  getTenantContext() {
    return TenantContext.currentTenantContext();
  }

  getTenantId() {
    return TenantContext.currentTenantId();
  }

  getEncryptionKey() {
    return TenantContext.currentEncryptionKey();
  }
}
