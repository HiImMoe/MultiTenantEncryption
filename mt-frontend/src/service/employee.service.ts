import { Injectable } from '@nestjs/common';
import { CreateEmployeeDTO, EmployeeApi } from 'src/api';
import { UpdateEmployeeDTO } from 'src/api/dto/update-employee-dto';
import { ApiService } from './api.service';
import { EncryptionService } from './encryption.service';
import { KeyService } from './key.service';

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
    private keysService: KeyService,
  ) {}

  async getEmployee(token: string) {
    const config = this.apiService.getApiConfig(token);
    const employeeApi = new EmployeeApi(config);
    const req = await employeeApi.employeeControllerGetEmployees({
      page: 0,
      pageSize: 10,
    });

    const key = await this.keysService.getKey();

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
    const key = await this.keysService.getKey();

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

  async updateEmployee(
    token: string,
    employeeId: string,
    employeeData: UpdateEmployeeDTO,
  ) {
    const key = await this.keysService.getKey();

    const encData = this.encryptionService.enc(
      employeeData,
      this.employeeEncKeys,
      key,
    );

    const config = this.apiService.getApiConfig(token);
    const employeeApi = new EmployeeApi(config);
    const req = await employeeApi.employeeControllerUpdateEmployee({
      employeeId,
      updateEmployeeDTO: encData,
    });
    return req.data;
  }
}
