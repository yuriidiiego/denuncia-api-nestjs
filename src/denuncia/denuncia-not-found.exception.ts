import { NotFoundException } from '@nestjs/common';

export class DenunciaNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Denúncia ${id} não encontrada`);
  }
}
