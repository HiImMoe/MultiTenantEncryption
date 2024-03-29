import { Injectable } from '@nestjs/common';
import {
  CreateEmployeeDTO as CreateEmployeeDTOWithHashes,
  UpdateEmployeeDTO as UpdateEmployeeDTOWithHashes,
  EmployeeApi,
} from 'src/api';
import { PagingDTO } from 'src/dto/common';
import {
  CreateEmployeeDTO,
  EmployeeDTO,
  UpdateEmployeeDTO,
} from 'src/dto/employee.dto';
import { SearchEmployeeModel } from 'src/models/employee.model';
import { ApiService } from './api.service';
import { EncryptionService } from './encryption.service';
import { HashKeys, HashService } from './hash.service';
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

  private hashEmployeeKeys: HashKeys[] = [
    { key: 'employeeNumber' },
    { key: 'gender' },
    { key: 'firstName', numberOfLetters: 3 },
    { key: 'lastName', numberOfLetters: 3 },
    { key: 'jobTitle' },
  ];

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private keysService: KeyService,
    private hashService: HashService,
  ) {}

  async getEmployee(
    token: string,
    params: SearchEmployeeModel,
    paging: PagingDTO,
    tenantId: string,
  ) {
    const key = await this.keysService.getKey(tenantId);
    const config = this.apiService.getApiConfig(token);
    const employeeApi = new EmployeeApi(config);

    const req = await employeeApi.employeeControllerGetEmployees({
      page: paging.page,
      pageSize: paging.pageSize,
      ...this.hashService.hashSearchParams(params, key.keyHash),
    });

    const decEmployees: EmployeeDTO[] = [];
    req.data.forEach((employee) => {
      try {
        const decEmployee = this.encryptionService.dec(
          employee,
          this.employeeEncKeys,
          key.keyEnc,
        );
        decEmployees.push(decEmployee);
      } catch (error) {
        console.log(error);
      }
    });

    return decEmployees;
  }

  async createEmployee(
    token: string,
    employeeData: CreateEmployeeDTO,
    tenantId: string,
  ): Promise<string> {
    const key = await this.keysService.getKey(tenantId);

    const encData = this.encryptionService.enc(
      employeeData,
      this.employeeEncKeys,
      key.keyEnc,
    );

    const hashes = await this.hashService.hashObject(
      employeeData,
      this.hashEmployeeKeys,
      key.keyHash,
    );

    const employeeDataWithHashes = {
      ...encData,
      ...hashes,
    } as CreateEmployeeDTOWithHashes;

    const config = this.apiService.getApiConfig(token);
    const employeeApi = new EmployeeApi(config);
    const req = await employeeApi.employeeControllerCreateEmployee({
      createEmployeeDTO: employeeDataWithHashes,
    });

    return req.data;
  }

  async updateEmployee(
    token: string,
    employeeId: string,
    employeeData: UpdateEmployeeDTO,
    tenantId: string,
  ) {
    const key = await this.keysService.getKey(tenantId);

    const encData = this.encryptionService.enc(
      employeeData,
      this.employeeEncKeys,
      key.keyEnc,
    );

    const hashes = await this.hashService.hashObject(
      employeeData,
      this.hashEmployeeKeys,
      key.keyHash,
    );

    const employeeDataWithHashes = {
      ...encData,
      ...hashes,
    } as UpdateEmployeeDTOWithHashes;

    const config = this.apiService.getApiConfig(token);
    const employeeApi = new EmployeeApi(config);
    const req = await employeeApi.employeeControllerUpdateEmployee({
      employeeId,
      updateEmployeeDTO: employeeDataWithHashes,
    });
    return req.data;
  }
}
