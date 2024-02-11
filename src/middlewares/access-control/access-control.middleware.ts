import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class AccessControlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (authorization == process.env.AUTHORIZATION) {
      next();
    } else {
      throw new HttpException(
        'invalid authorization token',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
