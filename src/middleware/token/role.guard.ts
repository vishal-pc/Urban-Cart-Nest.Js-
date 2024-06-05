import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/auth/services/user.service';
import { envConfig } from 'src/config/envConfig';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Token is required');
    }

    const decoded = this.jwtService.verify(token, {
      secret: envConfig.Jwt_Secret,
    });
    const user = await this.userService.findUserById(decoded.userId);

    if (!user || !roles.includes(user.role.role)) {
      throw new ForbiddenException('Unauthorized Access');
    }

    return true;
  }
}
