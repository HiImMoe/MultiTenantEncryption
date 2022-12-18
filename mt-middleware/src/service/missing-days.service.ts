import { Injectable } from '@nestjs/common';
import { MissingDaysApi } from 'src/api/api/missing-days-api';
import { CreateMissingDayDTO } from 'src/api/dto/create-missing-day-dto';
import { ApiService } from './api.service';
import { EncryptionService } from './encryption.service';
import { KeyService } from './key.service';

@Injectable()
export class MissingDaysService {
  private missingDaysEncKeys = ['date', 'reason'];

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private keyService: KeyService,
  ) {}

  async createMissingDay(token: string, missingDayData: CreateMissingDayDTO) {
    const key = await this.keyService.getKey();
    const encMD = this.encryptionService.enc(
      missingDayData,
      this.missingDaysEncKeys,
      key.keyEnc,
    );

    const config = this.apiService.getApiConfig(token);
    const missingDayApi = new MissingDaysApi(config);
    const req = await missingDayApi.missingDaysControllerCreateMissingDay({
      createMissingDayDTO: encMD,
    });
    return req.data;
  }
}
