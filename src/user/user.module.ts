import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserMapper } from './user.mapper';
import { BcryptService } from '../auth/bcrypt.service';
import { UserController } from './user.controller';

@Module({
  imports: [JwtModule],
  providers: [UserService, PrismaService, UserMapper, BcryptService],
  controllers: [UserController],
})
export class UserModule {}
