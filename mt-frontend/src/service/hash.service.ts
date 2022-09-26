import { Injectable } from '@nestjs/common';
import * as pbkdf2 from 'pbkdf2';
import { scryptSync } from 'crypto';

export interface HashKeys {
  key: string;
  numberOfLetters?: number;
}

@Injectable()
export class HashService {
  hashSearchParams(object: object, salt: string) {
    const hashParams = {};
    for (const [key] of Object.entries(object)) {
      hashParams[key] = scryptSync(object[key].toString(), salt, 32).toString(
        'hex',
      );
    }
    return hashParams;
  }

  hashObject(object: any, hashKeys: HashKeys[], salt: string) {
    const hashObject = {};
    hashKeys.forEach((hashKey) => {
      if (object[hashKey.key]) {
        hashObject[`${hashKey.key}_bi`] = [
          pbkdf2
            .pbkdf2Sync(object[hashKey.key].toString(), salt, 1, 32, 'sha512')
            .toString('hex'),
        ];
        if (hashKey.numberOfLetters) {
          for (let i = 0; i < hashKey.numberOfLetters; i++) {
            hashObject[`${hashKey.key}_bi`].push(
              pbkdf2
                .pbkdf2Sync(
                  object[hashKey.key].substring(0, i + 1),
                  'salt',
                  1,
                  32,
                  'sha512',
                )
                .toString('hex'),
            );
          }
        }
      }
    });
    return hashObject;
  }
}
