import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { UserResponse } from './payload/response/user.response';
import { UserMapper } from './user.mapper';
import { UserRegisterRequest } from './payload/request/user-register.request';
import { BcryptService } from '../auth/bcrypt.service';
import { InvalidCredentialsException } from '../auth/auth-exceptions';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userMapper: UserMapper,
    private readonly bcryptService: BcryptService,
  ) {}

  async register(registerRequest: UserRegisterRequest): Promise<UserResponse> {
    const { name, email, password } = registerRequest;
    const hashedPassword = await this.hashPassword(password);
    const createdUser = await this.createUser(name, email, hashedPassword);
    return this.userMapper.mapToResponse(createdUser);
  }

  async validateUserById(payload: JwtPayload): Promise<UserResponse> {
    const user = await this.findUserById(payload.userId);

    if (!user) {
      throw new NotFoundException(
        `Usuario com id ${payload.userId} não encontrado`,
      );
    }

    return this.userMapper.mapToResponse(user);
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.findUserByEmail(email);

    const isPasswordValid = await this.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return this.bcryptService.hashPassword(password);
  }

  private async createUser(name: string, email: string, password: string): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  private async findUserById(userId: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id: userId },
    });
  }

  private async findUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  private async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return this.bcryptService.comparePasswords(password, hashedPassword);
  }
}
