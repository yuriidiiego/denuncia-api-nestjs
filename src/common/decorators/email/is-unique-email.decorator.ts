import { registerDecorator } from 'class-validator';
import { IsUniqueEmailConstraint } from './is-unique-email.contraint';

export function IsUniqueEmail(): PropertyDecorator {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isUniqueEmail',
      target: object.constructor,
      propertyName,
      options: {
        // message: new IsUniqueEmailConstraint().defaultMessage,
      },
      validator: IsUniqueEmailConstraint,
    });
  };
}
