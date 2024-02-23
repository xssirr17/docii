import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorators/roles.decorator';
import { getTokenPayload } from 'src/helpers/getTokenPayload';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get(Roles, context.getHandler());
    const token = req.headers.token;
    const userRoles = (await getTokenPayload(token)).roles;

    let hasAccessOrNot = false;

    userRoles?.forEach((role) => {
      if (roles.includes(role)) {
        hasAccessOrNot = true;
      }
    });

    return hasAccessOrNot;
  }
}
