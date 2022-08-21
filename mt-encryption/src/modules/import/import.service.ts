import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestContext, TenantRequestContext } from 'src/context/tenant-context';
import { EmployeeService } from 'src/service/employee/employee.serivce';
import { TenantService } from 'src/service/tenant/tenant.service';
import { Repository } from 'typeorm';
import { Tenant } from '../database/tenant/tenant.entity';
import { User } from '../database/user/user.entity';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Tenant) private tenantRepo: Repository<Tenant>,
    private tenantService: TenantService,
    private employeeService: EmployeeService,
    private configService: ConfigService,
  ) {
    const run = async (): Promise<boolean> => {
      if (configService.get('RESET_DB') == '1') {
        await this.import();
        return true;
      }
      return false;
    };

    run()
      .catch((e: Error) => {
        console.log('Error Import', e);
        return true;
      })
      .then((end: boolean) => {
        if (end) {
          process.exit(0);
        }
      });
  }

  async import() {
    // await this.createTenant();
    // const ctx: TenantRequestContext = RequestContext.get();
    // if (ctx) {
    //   ctx.tenantId = '9d2d29ed-0cec-4faf-a1f2-7a715593bdff';
    // }
    // const tenant = await this.tenantService.createTenant({ tenantName: 'test1' });
    // new TenantRequestContext({}, {});
    // const ctx: TenantRequestContext = RequestContext.get();
    // console.log(ctx);
    // if (ctx) {
    //   ctx.tenantId = tenant.id;
    // }
    // await this.employeeService.createEmployee({
    //   employeeNumber: 1,
    //   firstName: 'Test',
    //   lastName: 'Tester',
    // });
    // await this.createUser();
  }

  async createUser() {
    await this.userRepo.save(
      await this.userRepo.create({
        id: '11e1577f-0f6c-4d6b-9725-9b8fc246e4a2',
        tenantId: '9d2d29ed-0cec-4faf-a1f2-7a715593bdff',
        keycloakId: 'd93328f5-50af-439c-8fd9-5237f262709c',
        firstName: 'Demo',
        lastName: 'User',
      }),
    );
  }

  create() {
    // create tenants
    // create user
    // create employees
  }

  async createTenant() {
    await this.tenantRepo.save(this.tenantRepo.create({ id: '9d2d29ed-0cec-4faf-a1f2-7a715593bdff', tenantName: 'DemoTenant' }));
  }
}
