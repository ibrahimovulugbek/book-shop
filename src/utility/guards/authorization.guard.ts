import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';

export const AuthorizationGuard = (allowedRoles: string[]) => {
    class RolesGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            const request = context.switchToHttp().getRequest();
            const result = request?.currentUser?.roles.map((role: string) => allowedRoles.includes(role)).find((val: boolean) => val === true);
            if (result) return true;
            throw new UnauthorizedException("Sorry, you are not authorization!")
        }
    }
    const guard = mixin(RolesGuardMixin)
    return guard;
}


