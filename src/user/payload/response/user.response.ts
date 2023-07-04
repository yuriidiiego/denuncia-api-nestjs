import {} from '@prisma/client';
import { Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
