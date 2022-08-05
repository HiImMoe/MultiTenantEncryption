import { Injectable, NestMiddleware } from '@nestjs/common';
import { TenantRequestContext } from 'src/context/tenant-context';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  count = 0;
  use(req: Request, res: Response, next: () => void) {
    TenantRequestContext.als.run(new TenantRequestContext(req, res), next);
  }
}
