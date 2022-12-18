import { UseGuards, Controller, Post, Body } from '@nestjs/common';
import { ApiOAuth2, ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateBoniDTO } from 'src/dto/boni.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { BoniService } from 'src/service/boni/boni.service';
import { ApiValidationErrorResponse } from 'src/validation';

@ApiOAuth2([])
@ApiTags('Boni')
@UseGuards(JwtAuthGuard)
@Controller('/:tenantId/boni')
export class BoniController {
  constructor(private boniService: BoniService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'id of the new boni entry',
    type: String,
  })
  @ApiValidationErrorResponse()
  @ApiOperation({ summary: 'creates a new boni entry' })
  async createMissingDay(@Body() boni: CreateBoniDTO) {
    return await this.boniService.createBoni(boni);
  }
}
