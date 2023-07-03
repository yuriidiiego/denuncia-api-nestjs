import { ConflictException, UnauthorizedException } from '@nestjs/common';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super(
      'Credenciais de login inválidas. A senha fornecida não corresponde à senha cadastrada.',
    );
  }
}

export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    super(
      'O e-mail fornecido já existe no sistema. Por favor, utilize um e-mail diferente.',
    );
  }
}   
