import { Injectable } from '@nestjs/common';
import { TenantApi } from 'src/api';
import { ApiService } from './api.service';

@Injectable()
export class TenantService {
  constructor(private apiService: ApiService) {}

  async getTenantId(token: string) {
    const config = this.apiService.getApiConfig(token);
    const tenantApi = new TenantApi(config);
    const req = await tenantApi.tenantControllerGetTenantId();
    return req.data;
  }
}
