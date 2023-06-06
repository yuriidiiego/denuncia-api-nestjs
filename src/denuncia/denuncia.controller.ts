import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { DenunciaService } from './denuncia.service';
import { DenunciaRequest } from './payload/request/create-denuncia.request';

@Controller('denuncias')
export class DenunciaController {
  constructor(private readonly denunciaService: DenunciaService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() denunciaRequest: DenunciaRequest) {
    return this.denunciaService.createDenuncia(denunciaRequest);
  }
}
