import { AsyncLocalStorage } from 'async_hooks';

export class RequestContext {
  static als = new AsyncLocalStorage<RequestContext>();

  static start = <T extends RequestContext>(constructor: new () => T): void => {
    RequestContext.als.enterWith(new constructor());
  };

  static get<T extends RequestContext>(): T {
    return RequestContext.als.getStore() as T;
  }

  constructor(public readonly req: Request, public readonly res: Response) {}
}
export class TenantRequestContext extends RequestContext {
  tenantId: string;
}
