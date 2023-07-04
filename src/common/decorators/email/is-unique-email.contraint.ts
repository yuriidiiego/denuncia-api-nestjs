import { PrismaClient } from '@prisma/client';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EmailAlreadyExistsException } from '../../../auth/auth-exceptions';

const prisma = new PrismaClient();

@ValidatorConstraint({ async: true })
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      throw new EmailAlreadyExistsException();
    }
    return true;
  }

  // defaultMessage({ property, value }: ValidationArguments): string {
  //   return `O ${property} "${value}" já existe no sistema. Por favor, utilize um e-mail diferente.`;
  // }
}
