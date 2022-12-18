import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

interface TenantKeys {
  keyEnc: string;
  keyHash: string;
}

@Injectable()
export class KeyService {
  constructor(private httpService: HttpService) {}

  async getKey(
    tenantId = '97a8f644-e815-44a3-b542-62982a29161c',
  ): Promise<TenantKeys> {
    const req = await this.keyManagementReq(tenantId).toPromise();
    return req.data;
  }

  keyManagementReq(tenantId: string): Observable<AxiosResponse<TenantKeys>> {
    return this.httpService.get(`http://localhost:3200/${tenantId}`);
  }
}
