import { Injectable } from '@nestjs/common';
import { scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class KeyService {
  async getKey(): Promise<string> {
    const key = (
      (await promisify(scrypt)('test', 'salt', 32)) as Buffer
    ).toString('hex');
    return key;
  }
}
