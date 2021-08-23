import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { HashProvider } from 'src/shared/providers/HashProvider/services/crypto.service';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashProvider: HashProvider,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    const passwordMatch = await this.hashProvider.compareHash(
      pass,
      user.password,
    );

    if (!user || !passwordMatch) {
      return null;
    }

    return user;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      user,
      token,
    };
  }
}
