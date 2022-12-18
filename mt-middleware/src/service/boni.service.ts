import { Injectable } from '@nestjs/common';
import { BoniApi } from 'src/api/api/boni-api';
import { CreateBoniDTO } from 'src/api/dto/create-boni-dto';
import { ApiService } from './api.service';
import { EncryptionService } from './encryption.service';
import { KeyService } from './key.service';

@Injectable()
export class BoniService {
  private boniEncKeys = ['date', 'amount', 'boniReason'];

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private keyService: KeyService,
  ) {}

  async createBoni(token: string, boniData: CreateBoniDTO) {
    const key = await this.keyService.getKey();
    const encBoni = this.encryptionService.enc(
      boniData,
      this.boniEncKeys,
      key.keyEnc,
    );

    const config = this.apiService.getApiConfig(token);
    const boniApi = new BoniApi(config);
    const req = await boniApi.boniControllerCreateMissingDay({
      createBoniDTO: encBoni,
    });
    return req.data;
  }
}
