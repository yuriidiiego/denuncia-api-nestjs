import { NotFoundException } from '@nestjs/common';

export class DenunciaNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Denuncia ${id} not found`);
  }
}
