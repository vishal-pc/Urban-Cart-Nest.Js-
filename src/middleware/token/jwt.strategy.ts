import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/auth/services/user.service';
import { envConfig } from 'src/config/envConfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'logintoken') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConfig.Jwt_Secret,
    });
  }
  async validate(payload: any) {
    const user = await this.userService.findUserById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
