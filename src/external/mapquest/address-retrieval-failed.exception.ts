import { HttpException, HttpStatus } from '@nestjs/common';

export class AddressRetrievalFailedException extends HttpException {
  constructor() {
    super(
      'Falha ao obter o endereço a partir das coordenadas',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
