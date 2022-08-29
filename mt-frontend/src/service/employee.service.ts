import { Injectable } from '@nestjs/common';
import { scrypt } from 'crypto';
import { CreateEmployeeDTO, EmployeeApi } from 'src/api';
import { promisify } from 'util';
import { ApiService } from './api.service';
import { EncryptionService } from './encryption.service';

@Injectable()
export class EmployeeService {
  private employeeEncKeys = [
    'employeeNumber',
    'gender',
    'firstName',
    'lastName',
    'street',
    'city',
    'country',
    'email',
    'phone',
    'jobTitle',
    'ssn',
    'iban',
  ];

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
  ) {}

  async getEmployee(token: string) {
    const config = this.apiService.getApiConfig(token);
    const employeeApi = new EmployeeApi(config);
    const req = await employeeApi.employeeControllerGetEmployees({
      page: 0,
      pageSize: 10,
    });

    const key = (
      (await promisify(scrypt)('test', 'salt', 32)) as Buffer
    ).toString('hex');

    const decEmployee = this.encryptionService.dec(
      req.data,
      this.employeeEncKeys,
      key,
    );

    return decEmployee;
  }

  async createEmployee(
    token: string,
    employeeData: CreateEmployeeDTO,
  ): Promise<string> {
    const key = (
      (await promisify(scrypt)('test', 'salt', 32)) as Buffer
    ).toString('hex');

    const encData = this.encryptionService.enc(
      employeeData,
      this.employeeEncKeys,
      key,
    );

    const config = this.apiService.getApiConfig(token);
    const employeeApi = new EmployeeApi(config);
    const req = await employeeApi.employeeControllerCreateEmployee({
      createEmployeeDTO: encData,
    });
    return req.data;
  }
}
