import { UserService } from '@/v1/user/user.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../db/entities/user.entity';
// import { AuthGuard } from '@nestjs/passport';
// import { Observable } from 'rxjs';
import { Role } from '../../types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userServices: UserService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);

    if (!requireRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) return;

    let localUserRoles = [this.userServices.getRoleById(user.userId)];

    return requireRoles.some((role) => localUserRoles.includes(role));
  }
}
