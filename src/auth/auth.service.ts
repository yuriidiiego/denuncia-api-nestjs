import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { InvalidCredentialsException } from './auth-exceptions';
import { BcryptService } from './bcrypt.service';
import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsRequest } from './payload/request/auth-credentials.request';
import { AuthRegisterRequest } from './payload/request/auth-register.request';
import { LoginResponse } from './payload/response/auth-login.response';
import { AuthUserResponse } from './payload/response/auth-user.response';
import { UserMapper } from './user.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private readonly userMapper: UserMapper,
  ) {}

  async register(register: AuthRegisterRequest): Promise<AuthUserResponse> {
    const { name, email, password } = register;

    const hashedPassword = await this.bcryptService.hashPassword(password);

    const userRole = await this.prismaService.role.findUnique({
      where: { name: UserRole.USER },
    });

    if (!userRole) {
      throw new NotFoundException(`Perfil ${UserRole.USER} não encontrado!`);
    }

    const createdUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: { connect: { id: userRole.id } },
      },
    });

    return this.userMapper.mapToResponse(createdUser);
  }

  async login(
    authCredentialsRequest: AuthCredentialsRequest,
  ): Promise<LoginResponse> {
    const { email, password } = authCredentialsRequest;

    const user = await this.validateUserCredentials(email, password);

    const payload: JwtPayload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const payload: JwtPayload = { userId: 1 };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordValid = await this.bcryptService.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    return user;
  }

  async validateUserById(userId: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }

    return user;
  }
}
