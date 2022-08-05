import { Controller, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@ApiOAuth2([])
@ApiTags('employee')
@UseGuards(JwtAuthGuard)
@Controller('employee')
export class EmployeeController {}
