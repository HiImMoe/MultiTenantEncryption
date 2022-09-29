import { Injectable } from '@nestjs/common';
import { Configuration } from 'src/api';

@Injectable()
export class ApiService {
  getApiConfig(token: string) {
    return new Configuration({
      basePath: 'http://localhost:3000',
      baseOptions: {
        headers: {
          Authorization: token,
        },
      },
    });
  }
}
