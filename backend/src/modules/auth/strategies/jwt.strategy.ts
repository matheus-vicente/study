import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(String(payload.sub));

    if (!user) {
      throw new UnauthorizedException('Jwt not match');
    }

    if (!user.teacher) {
      throw new UnauthorizedException(
        'You must to be teacher to do this operation',
      );
    }

    return { id: payload.sub, email: payload.email };
  }
}
