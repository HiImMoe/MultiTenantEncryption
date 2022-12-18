import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

interface TenantFileObject {
  id: string;
  tenantId: string;
  tenantName: string;
  tenantKeyEnc: string;
  tenantKeyHash: string;
}

@Injectable()
export class AppService {
  getTenant(tenantId: string): { keyEnc: string; keyHash: string } {
    const tenantList: TenantFileObject[] = this.importFileData('tenant.json');
    const tenant = tenantList.find((t) => t.tenantId === tenantId);
    return { keyEnc: tenant.tenantKeyEnc, keyHash: tenant.tenantKeyHash };
  }

  importFileData(fileName) {
    try {
      const data = fs.readFileSync(`./src/${fileName}`, 'utf8');
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  }
}
