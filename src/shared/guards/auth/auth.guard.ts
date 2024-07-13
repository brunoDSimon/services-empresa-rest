import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/features/auth/auth.service';
import { IS_PUBLIC_KEY } from 'src/shared/decorators/public-routes.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization) {
      return false;
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return false;
    }

    try {
      const data = await this.authService.checkToken(token);
      request.token = data;
      request.user = await this.authService.findOne(data.id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
