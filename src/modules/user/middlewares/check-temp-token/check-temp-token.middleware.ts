import {
  Injectable,
  NestMiddleware,
  Inject,
  Headers,
  Body,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { verify } from 'jsonwebtoken';
import { registerDto } from '../../dtos/register.dto';
import errors from 'src/constants/errors';

@Injectable()
export class CheckTempTokenMiddleware implements NestMiddleware {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async use(@Headers() headers, @Body() body: registerDto, next: NextFunction) {
    const token = headers.token;
    const mobileNumber = body.mobileNumber;
    const isVerify = await this.#verifyTempToken(mobileNumber, token);
    if (isVerify) {
      next();
    }
    throw errors.unauthorized;
  }

  async #verifyTempToken(mobileNumber: string, inputToken: string) {
    const tokenKey = `tempToken_${mobileNumber}`;
    const token = await this.cacheManager.get(tokenKey);
    if (!token) {
      return false;
    } else if (token == inputToken) {
      const privateKey = process.env.PRIVATE_KEY;
      verify(inputToken, privateKey, (err, decoded) => {
        if (err) {
          return false;
        }
      });
      return true;
    }
    return false;
  }
}
