import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RatelimitMiddleware implements NestMiddleware {
  private rateLimitTtl: number;
  private rateLimitPerTtl: number;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.rateLimitTtl = 60 * 1000;
    this.rateLimitPerTtl = 3;
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const { ip } = req;
    const ipRate = await this.cacheManager.get(ip);
    if (ipRate && +ipRate <= this.rateLimitPerTtl) {
      await this.cacheManager.set(ip, +ipRate + 1);
    } else if (!ipRate) {
      await this.cacheManager.set(ip, 1, this.rateLimitTtl);
    } else {
      throw new HttpException('rateLimit exceeded', HttpStatus.BAD_REQUEST);
    }
    next();
  }
}
