import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { Endereco } from '@prisma/client';
import { MapQuestService } from './mapquest.service';

@ApiTags('Endereços')
@Controller('endereco')
export class MapQuestController {
  constructor(private readonly mapQuestService: MapQuestService) {}

  @ApiOperation({
    summary: 'Obter endereço por coordenadas',
    description: 'Retorna o endereço pelas coordenadas',
    operationId: 'getAddressFromCoordinates',
  })
  @ApiOkResponse({
    description: 'Endereço recuperado com sucesso',
    status: 200,
    schema: {
      $ref: '#/components/schemas/Endereco',
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Falha ao recuperar o endereço da API do MapQuest.',
    status: 500,
  })
  @ApiQuery({
    name: 'lat',
    type: Number,
    description: 'Latitude das coordenadas',
    example: 51.507351,
  })
  @ApiQuery({
    name: 'long',
    type: Number,
    description: 'Longitude das coordenadas',
    example: -0.127758,
  })
  @Get()
  async getAddressFromCoordinates(
    @Query('lat') lat: number,
    @Query('long') long: number,
  ): Promise<Endereco> {
    const address = await this.mapQuestService.getAddressFromCoordinates(
      lat,
      long,
    );
    return address;
  }
}
