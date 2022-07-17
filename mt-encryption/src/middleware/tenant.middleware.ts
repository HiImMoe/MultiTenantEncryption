import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as cls from 'cls-hooked';
import { TenantContext } from 'src/context/tenant-context';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('middleware');
    const tenantContext = new TenantContext(Math.random().toString(), 'encKey');
    const session = cls.getNamespace(TenantContext.nsid) || cls.createNamespace(TenantContext.nsid);
    session.run(() => {
      session.set(TenantContext.name, tenantContext);
      next();
    });
  }
}
