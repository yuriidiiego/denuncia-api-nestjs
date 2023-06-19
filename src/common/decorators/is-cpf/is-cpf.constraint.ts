import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCPF', async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const regex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;
    return typeof value === 'string' && regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} deve ser um CPF válido. Exemplo: 123.456.789-00.`;
  }
}
