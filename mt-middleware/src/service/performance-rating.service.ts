import { Injectable } from '@nestjs/common';
import { PerformanceRatingApi } from 'src/api/api/performance-rating-api';
import { CreatePerformanceRatingDTO } from 'src/api/dto/create-performance-rating-dto';
import { ApiService } from './api.service';
import { EncryptionService } from './encryption.service';
import { KeyService } from './key.service';

@Injectable()
export class PerformanceRatingService {
  private performanceRatingEncKeys = ['date', 'notes'];

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private keyService: KeyService,
  ) {}

  async createPerformanceRating(
    token: string,
    performanceRatingData: CreatePerformanceRatingDTO,
  ) {
    const key = await this.keyService.getKey();
    const encPR = this.encryptionService.enc(
      performanceRatingData,
      this.performanceRatingEncKeys,
      key.keyEnc,
    );

    const config = this.apiService.getApiConfig(token);
    const performanceRatingApi = new PerformanceRatingApi(config);
    const req =
      await performanceRatingApi.performanceRatingControllerCreateMissingDay({
        createPerformanceRatingDTO: encPR,
      });
    return req.data;
  }
}
