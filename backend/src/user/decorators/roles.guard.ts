import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());
    if (!roles) {
      return true;
    }
    console.log(roles,"roles in guard ")
    // const request = ctx.getContext().req;
    const user = ctx.getContext().user; //user is hardcoded in graphqlmodule inside  context 
    console.log(roles,user.roles)
    return this.matchRoles(roles, user.roles);
    // return false
  }

  matchRoles(allowedRoles: string[], userRoles: string[]): boolean {
    return allowedRoles.some(role => userRoles.includes(role));
  }
}
