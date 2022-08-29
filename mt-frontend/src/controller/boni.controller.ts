import { Request } from 'express';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateBoniDTO } from 'src/api/dto/create-boni-dto';
import { BoniService } from 'src/service/boni.service';

@Controller('/boni')
export class BoniController {
  constructor(private boniService: BoniService) {}

  @Post()
  async createBoni(@Req() req: Request, @Body() boni: CreateBoniDTO) {
    const data = await this.boniService.createBoni(
      req.headers.authorization,
      boni,
    );
    return data;
  }
}
