import { Injectable } from '@nestjs/common';
import { scryptSync } from 'crypto';

const SCRYPT_PARAMS = {
  N: 2048,
  r: 8,
  p: 1,
};

export interface HashKeys {
  key: string;
  numberOfLetters?: number;
}

@Injectable()
export class HashService {
  hashSearchParams(object: object, salt: string) {
    const hashParams = {};
    for (const [key] of Object.entries(object)) {
      hashParams[key] = scryptSync(
        object[key].toString(),
        salt,
        64,
        SCRYPT_PARAMS,
      ).toString('hex');
    }
    return hashParams;
  }

  hashObject(object: any, hashKeys: HashKeys[], salt: string) {
    const hashObject = {};
    hashKeys.forEach((hashKey) => {
      if (object[hashKey.key]) {
        hashObject[`${hashKey.key}_bi`] = [
          scryptSync(
            object[hashKey.key].toString(),
            salt,
            64,
            SCRYPT_PARAMS,
          ).toString('hex'),
        ];
        if (hashKey.numberOfLetters) {
          for (let i = 0; i < hashKey.numberOfLetters; i++) {
            hashObject[`${hashKey.key}_bi`].push(
              scryptSync(
                object[hashKey.key].substring(0, i + 1),
                salt,
                64,
                SCRYPT_PARAMS,
              ).toString('hex'),
            );
          }
        }
      }
    });
    return hashObject;
  }
}
