import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

export class AddressRetrievalFailedException extends InternalServerErrorException {
  constructor() {
    super('Falha ao recuperar o endereço da API do MapQuest.');
  }
}
