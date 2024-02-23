import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorators/roles.decorator';
import { getTokenPayload } from 'src/helpers/getTokenPayload';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get(Roles, context.getHandler());
    const token = req.headers.token;
    const userRoles = getTokenPayload(token).roles;

    let hasAccessOrNot = false;

    userRoles.forEach((role) => {
      if (roles.includes(role)) {
        hasAccessOrNot = true;
      }
    });

    return hasAccessOrNot;
  }
}
