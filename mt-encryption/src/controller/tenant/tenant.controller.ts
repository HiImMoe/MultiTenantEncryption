import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateTenantDTO, TenantDTO } from 'src/dto/tenant.dto';
import { TenantService } from 'src/service/tenant/tenant.service';
import { ApiOAuth2, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRequest } from '../request.interface';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/tenant')
@ApiTags('tenant')
@ApiOAuth2([])
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Post()
  async createTenant(@Body() newTenant: CreateTenantDTO): Promise<TenantDTO> {
    return this.tenantService.createTenant(newTenant);
  }

  @ApiResponse({ description: 'Returns the tenantId of the current user' })
  @Get('/tenantId')
  async getTenantId(@Request() request: UserRequest): Promise<string> {
    return request.user.tenantId;
  }
}
