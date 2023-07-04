import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DenunciaService } from './denuncia.service';
import { DenunciaRequest } from './payload/request/create-denuncia.request';
import { UpdateDenunciaRequest } from './payload/request/update-denuncia.request';
import { DenunciaResponse } from './payload/response/create-denuncia.response';

@ApiTags('Denúncias')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('denuncia')
export class DenunciaController {
  constructor(private readonly denunciaService: DenunciaService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Criar uma denúncia',
    operationId: 'createDenuncia',
  })
  @ApiCreatedResponse({
    description: 'Denúncia criada com sucesso',
    type: DenunciaResponse,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos no corpo da requisição',
  })
  async create(
    @Body() denunciaRequest: DenunciaRequest,
  ): Promise<DenunciaResponse> {
    return this.denunciaService.createDenuncia(denunciaRequest);
  }

  @Get()
  @ApiOperation({
    summary: 'Obter todas as denúncias',
    operationId: 'getDenuncias',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de denúncias recuperada com sucesso',
    type: DenunciaResponse,
    isArray: true,
  })
  async getDenuncias(): Promise<DenunciaResponse[]> {
    return this.denunciaService.getDenuncias();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter uma denúncia pelo ID',
    operationId: 'getDenuncia',
  })
  @ApiParam({ name: 'id', description: 'ID da denúncia', type: 'number' })
  @ApiOkResponse({
    description: 'Denúncia recuperada com sucesso',
    type: DenunciaResponse,
    status: 200,
  })
  @ApiNotFoundResponse({ description: 'Denúncia não encontrada', status: 404 })
  async getDenuncia(@Param('id') id: number): Promise<DenunciaResponse> {
    return this.denunciaService.getDenunciaById(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir uma denúncia pelo ID',
    operationId: 'deleteDenuncia',
  })
  @ApiParam({ name: 'id', description: 'ID da denúncia', type: 'number' })
  @ApiNoContentResponse({
    description: 'Denúncia excluída com sucesso',
    status: 204,
  })
  @ApiNotFoundResponse({ description: 'Denúncia não encontrada', status: 404 })
  @HttpCode(204)
  async deleteDenuncia(@Param('id') id: number): Promise<void> {
    await this.denunciaService.deleteDenuncia(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar uma denúncia pelo ID',
    operationId: 'updateDenuncia',
  })
  @ApiParam({ name: 'id', description: 'ID da denúncia', type: 'number' })
  @ApiBody({ type: UpdateDenunciaRequest })
  @ApiOkResponse({
    description: 'Denúncia atualizada com sucesso',
    type: DenunciaResponse,
  })
  @ApiNotFoundResponse({ description: 'Denúncia não encontrada', status: 404 })
  async updateDenuncia(
    @Param('id') id: number,
    @Body() updateRequest: UpdateDenunciaRequest,
  ): Promise<DenunciaResponse> {
    return this.denunciaService.updateDenuncia(id, updateRequest);
  }
}
