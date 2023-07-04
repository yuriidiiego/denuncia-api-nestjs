import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { UserResponse } from './payload/response/user.response';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserMapper {
  mapToResponse(createdUser: User): UserResponse {
    return plainToClass(UserResponse, createdUser, {
      excludeExtraneousValues: true,
    });
  }
}
