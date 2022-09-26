import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';
import { RequestContext, TenantRequestContext } from 'src/context/tenant-context';
import { UserRequest } from 'src/controller/request.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private authService: AuthService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: false,
        rateLimit: false,
        jwksRequestsPerMinute: 5,
        jwksUri: configService.get('AUTH_JWKS') || '',
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get('AUTH_AUDIENCE'),
      issuer: configService.get('AUTH_ISSUER'),
    });
  }

  async validate(payload: JwtPayload): Promise<UserRequest['user']> {
    const user = await this.authService.loadUserByJwtToken(payload.sub);
    const ctx: TenantRequestContext = RequestContext.get();
    if (ctx) {
      ctx.tenantId = user.tenantId;
    }
    return user;
  }
}
