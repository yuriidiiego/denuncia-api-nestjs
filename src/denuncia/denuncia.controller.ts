import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DenunciaService } from './denuncia.service';
import { DenunciaRequest } from './payload/request/create-denuncia.request';
import { UpdateDenunciaRequest } from './payload/request/update-denuncia.request';
import { DenunciaResponse } from './payload/response/create-denuncia.response';

@Controller('denuncias')
export class DenunciaController {
  constructor(private readonly denunciaService: DenunciaService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() denunciaRequest: DenunciaRequest) {
    return this.denunciaService.createDenuncia(denunciaRequest);
  }

  @Get()
  async getDenuncias() {
    return this.denunciaService.getDenuncias();
  }

  @Get(':id')
  async getDenuncia(@Param('id') id: number) {
    return this.denunciaService.getDenunciaById(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteDenuncia(@Param('id') id: number) {
    return this.denunciaService.deleteDenuncia(id);
  }

  @Patch(':id')
  async updateDenuncia(
    @Param('id') id: number,
    @Body() updateRequest: UpdateDenunciaRequest,
  ): Promise<DenunciaResponse> {
    return this.denunciaService.updateDenuncia(id, updateRequest);
  }
}
