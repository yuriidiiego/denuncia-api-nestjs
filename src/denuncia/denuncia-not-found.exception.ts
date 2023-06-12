import { NotFoundException } from '@nestjs/common';

export class DenunciaNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Denúncia com ID ${id} não encontrada.`);
  }
}
    