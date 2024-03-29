import { HttpService, Injectable } from '@nestjs/common';
import { TenantRequestContext, RequestContext } from 'src/context/tenant-context';
import { TenantService } from '../tenant/tenant.service';
import * as fs from 'fs';
import { ImportTenantDTO } from 'src/dto/tenant.dto';
import { PerformanceRatingService } from '../performance-rating/performance-rating.service';
import { CreatePerformanceRatingDTO } from 'src/dto/performance-rating.dto';
import { CreateBoniDTO } from 'src/dto/boni.dto';
import { BoniService } from '../boni/boni.service';
import { CreateMissingDayDTO } from 'src/dto/missing-days.dto';
import { MissingDayService } from '../missing-day/missing-day.service';
import * as cliProgress from 'cli-progress';
import { UserService } from '../user/user.service';

const NUMBER_OF_TENANTS = 100;

@Injectable()
export class ImportService {
  constructor(
    private tenantService: TenantService,
    private performanceRatingService: PerformanceRatingService,
    private boniService: BoniService,
    private missingDayService: MissingDayService,
    private httpService: HttpService,
    private userService: UserService,
  ) {}

  async importData() {
    const tenantList: ImportTenantDTO[] = this.importFileData('tenant.json');
    const progressBar = new cliProgress.SingleBar(
      {
        barsize: 60,
        format: `Import:  {bar} {percentage}% | ETA: {eta}s | {value}/{total}`,
      },
      cliProgress.Presets.shades_classic,
    );
    progressBar.start(NUMBER_OF_TENANTS, 0);
    for (let i = 0; i < NUMBER_OF_TENANTS; i++) {
      await this.importTenant(tenantList[i], i);
      progressBar.increment();
    }
    progressBar.stop();
  }

  async importTenant(tenantData: ImportTenantDTO, currentTenantNumber: number) {
    const tenant = await this.tenantService.importTenant(tenantData);
    const ctx: TenantRequestContext = RequestContext.get();
    if (ctx) {
      ctx.tenantId = tenant.id;
    }

    const keycloakUserId = await this.importKeycloakUser(currentTenantNumber);
    this.userService.createUser({ firstName: 'First', lastName: tenant.tenantName, isActive: true, keycloakId: keycloakUserId });
  }

  async importKeycloakUser(tenantNumber) {
    const authParams = new URLSearchParams({
      grant_type: process.env.KEYCLOAK_ADMIN_GRANT_TYPE || '',
      client_id: process.env.KEYCLOAK_ADMIN_CLIENT_ID || '',
      client_secret: process.env.KEYCLOAK_ADMIN_CLIENT_SECRET || '',
    });
    const authRes = await this.httpService
      .post(process.env.KEYCLOAK_TOKEN_URL || '', authParams.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .toPromise();
    const token = `Bearer ${authRes.data.access_token}`;
    await this.httpService
      .post(
        process.env.KEYCLOAK_USER_URL || '',
        {
          username: `user@tenant${tenantNumber}.com`,
          email: `user@tenant${tenantNumber}.com`,
          firstName: 'User',
          lastName: 'Tenant',
          enabled: true,
          credentials: [{ type: 'password', value: 'test', temporary: false }],
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .toPromise()
      .catch(e => console.log(e));

    const getUserRes = await this.httpService
      .get(`${process.env.KEYCLOAK_USER_URL || ''}`, {
        headers: {
          Authorization: token,
        },
        params: {
          username: `user@tenant${tenantNumber}.com`,
          exact: true,
        },
      })
      .toPromise();
    return getUserRes.data[0].id;
  }

  async createPerformanceRatings(employeeId: string, numberOfRatings: number) {
    const performanceRatings: CreatePerformanceRatingDTO[] = this.importFileData('performance-rating.json');
    for (let i = 0; i < numberOfRatings; i++) {
      await this.performanceRatingService.createPerformanceRating({ ...performanceRatings[i], employeeId: employeeId });
    }
  }

  async createBoni(employeeId: string, numberOfBoni: number) {
    const boni: CreateBoniDTO[] = this.importFileData('boni.json');
    for (let i = 0; i < numberOfBoni; i++) {
      await this.boniService.createBoni({ ...boni[i], employeeId });
    }
  }

  async createMissingDays(employeeId: string, numberOfMissingDays) {
    const missingDays: CreateMissingDayDTO[] = this.importFileData('missing-days.json');
    for (let i = 0; i < numberOfMissingDays; i++) {
      await this.missingDayService.createMissingDay({ ...missingDays[i], employeeId });
    }
  }

  importFileData(fileName) {
    try {
      const data = fs.readFileSync(`importData/${fileName}`, 'utf8');
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  }
}
