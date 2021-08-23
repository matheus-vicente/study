import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class HashProvider {
  async generateHash(payload: string) {
    return await hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string) {
    return await compare(payload, hashed);
  }
}
