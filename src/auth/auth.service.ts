import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsRequest } from './payload/request/auth-credentials.request';
import { JwtLoginResponse } from './payload/response/jwt-login.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(credentials: AuthCredentialsRequest): Promise<JwtLoginResponse> {
    const user = await this.userService.validateUserCredentials(
      credentials.email,
      credentials.password,
    );
    const payload: JwtPayload = this.createJwtPayload(user.id);
    return {
      accessToken: this.generateAccessToken(payload),
    };
  }

  createJwtPayload(userId: number): JwtPayload {
    return { userId };
  }

  generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
