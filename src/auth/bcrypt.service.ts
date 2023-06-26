import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return hash(password, salt);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
