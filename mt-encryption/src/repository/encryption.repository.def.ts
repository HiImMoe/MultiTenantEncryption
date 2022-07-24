export abstract class EncryptionRepositoryDef {
  abstract enc<T>(plainObject: T, objectKeysToEncrypt: string[], key: string): T;
  abstract dec<T>(encryptedObject: T, objectKeysToEncrypt: string[], key: string): T;
}
