import { Controller, Post } from '@nestjs/common';
import { ImportService } from 'src/service/import/import.service';

@Controller('/import')
export class ImportController {
  constructor(private importService: ImportService) {}

  @Post()
  async importData() {
    await this.importService.importData();
    console.log('Finished');
  }
}
