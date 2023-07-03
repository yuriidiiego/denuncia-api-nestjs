import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { UserMapper } from '../user/user.mapper';
import { AuthService } from './auth.service';
import { BcryptService } from './bcrypt.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    BcryptService,
    PrismaService,
    UserMapper,
    UserService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
