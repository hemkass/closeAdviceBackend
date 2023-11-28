import { IUsersService } from '@/users/services/iusers.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';

import { UsersService } from '@/users/services/users.service';

import { Request } from 'express';
import { UserNotFoundException } from '@/users/exceptions/user.not.found.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsersService)
    private userService: IUsersService,
  ) {
    super({
      secretOrKey: `${process.env.JWTSecretKey}`,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }
  async validate(payload: any, request: Request) {
    const { email } = payload.data;

    const user = await this.userService.getUserByEmail(email);

    if (!user?.id) {
      throw new UserNotFoundException(`User not found`);
    }
  }
}
