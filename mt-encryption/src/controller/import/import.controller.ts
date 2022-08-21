import { Controller, Post } from '@nestjs/common';
import { ImportService } from 'src/service/import/import.service';

@Controller('/import')
export class ImportController {
  constructor(private importService: ImportService) {}

  @Post()
  async importData() {
    const startDate = new Date();
    await this.importService.importData();
    const currentDate = new Date();
    console.log('End', startDate, currentDate);
  }
}
