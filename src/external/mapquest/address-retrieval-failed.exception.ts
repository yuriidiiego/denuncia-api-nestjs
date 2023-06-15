import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

export class AddressRetrievalFailedException extends InternalServerErrorException {
  constructor() {
    super('Failed to retrieve address from MapQuest API.');
  }
}
