import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class EncryptionService {
  ivLength = 16;
  algorithm = 'aes-256-ctr';

  enc<T>(plainObject: T, objectKeysToEncrypt: string[], key: string): T {
    const encryptedObject = { ...plainObject };
    objectKeysToEncrypt.forEach((objectKey) => {
      if (encryptedObject[objectKey]) {
        encryptedObject[objectKey] = this.encryptValue(
          plainObject[objectKey],
          key,
        );
      }
    });
    return encryptedObject;
  }

  private encryptValue(value: string, key: string) {
    const iv = randomBytes(this.ivLength);
    const cipher = createCipheriv(this.algorithm, Buffer.from(key, 'hex'), iv);
    const start = cipher.update(value.toString());
    const final = cipher.final();
    const encryptedText = Buffer.concat([iv, start, final]);

    return encryptedText.toString('hex');
  }

  dec<T>(encryptedObject: T, objectKeysToEncrypt: string[], key: string): T {
    const plainObject = { ...encryptedObject };
    objectKeysToEncrypt.forEach((objectKey) => {
      plainObject[objectKey] = this.decryptValue(
        encryptedObject[objectKey],
        key,
      );
    });
    return plainObject;
  }

  private decryptValue(value: string, key: string) {
    const encryptedText = Buffer.from(value, 'hex');
    const iv = encryptedText.slice(0, this.ivLength);
    const decipher = createDecipheriv(
      this.algorithm,
      Buffer.from(key, 'hex'),
      iv,
    );
    const dataToUse = encryptedText.slice(this.ivLength);
    const start = decipher.update(dataToUse);
    const final = decipher.final();
    return Buffer.concat([start, final]).toString();
  }
}
