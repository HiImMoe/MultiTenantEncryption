import { Injectable } from '@nestjs/common';
import { EmployeeApi } from 'src/api';
import { ApiService } from './api.service';

@Injectable()
export class EmployeeService {
  constructor(private apiService: ApiService) {}

  async getEmployee(token: string) {
    const config = this.apiService.getApiConfig(token);
    const employeeApi = new EmployeeApi(config);
    const req = await employeeApi.employeeControllerGetEmployees({
      employeeNumber: 1,
      page: 0,
      pageSize: 10,
    });
    return req.data;
  }
}
