import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsCPFConstraint } from './is-cpf.constraint';

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsCPFConstraint,
    });
  };
}
