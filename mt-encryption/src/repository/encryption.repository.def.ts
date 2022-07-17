export abstract class EncryptionRepositoryDef {
  abstract encrypt(plainObject: any, objectKeysToEncrypt: string[], key: string): any;
  abstract decrypt(plainObject: any, objectKeysToEncrypt: string[], key: string): any;
}
