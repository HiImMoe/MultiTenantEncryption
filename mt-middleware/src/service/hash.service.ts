import { Injectable } from '@nestjs/common';
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
      // hashParams[key] = pbkdf2Sync(
      //   object[key].toString(),
      //   salt,
      //   1024,
      //   64,
      //   'sha512',
      // ).toString('hex');
      hashParams[key] = scryptSync(object[key].toString(), salt, 64, {
        N: 1024,
        r: 1,
        p: 1,
      }).toString('hex');
    }
    return hashParams;
  }

  hashObject(object: any, hashKeys: HashKeys[], salt: string) {
    const hashObject = {};
    hashKeys.forEach((hashKey) => {
      if (object[hashKey.key]) {
        hashObject[`${hashKey.key}_bi`] = [
          // pbkdf2Sync(
          //   object[hashKey.key].toString(),
          //   salt,
          //   1024,
          //   64,
          //   'sha512',
          // ).toString('hex'),
          scryptSync(object[hashKey.key].toString(), salt, 64, {
            N: 1024,
            r: 1,
            p: 1,
          }).toString('hex'),
        ];
        if (hashKey.numberOfLetters) {
          for (let i = 0; i < hashKey.numberOfLetters; i++) {
            hashObject[`${hashKey.key}_bi`].push(
              // pbkdf2Sync(
              //   object[hashKey.key].substring(0, i + 1),
              //   'salt',
              //   1024,
              //   64,
              //   'sha512',
              // ).toString('hex'),
              scryptSync(object[hashKey.key].substring(0, i + 1), 'salt', 64, {
                N: 1024,
                r: 1,
                p: 1,
              }).toString('hex'),
            );
          }
        }
      }
    });
    return hashObject;
  }
}
