import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getTokenPayload } from 'src/helpers/getTokenPayload';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const req = context.switchToHttp().getRequest();
      const userToken = req.headers.token;
      const tokenPayload = await getTokenPayload(userToken);
      const tokenKey = `token_${tokenPayload?.mobileNumber}`;
      const token = await this.cacheManager.get(tokenKey);

      let hasAccessOrNot = false;
      if (token && token == userToken) {
        hasAccessOrNot = true;
        req.mobileNumber = tokenPayload.mobileNumber;
      }

      return hasAccessOrNot;
    } catch (err) {
      return false;
    }
  }
}
