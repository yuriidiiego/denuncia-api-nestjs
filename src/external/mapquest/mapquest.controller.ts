import { Controller, Get, Query } from '@nestjs/common';
import { MapQuestService } from './mapquest.service';
import { Endereco } from '@prisma/client';

@Controller('endereco')
export class MapQuestController {
  constructor(private readonly mapQuestService: MapQuestService) {}

  @Get()
  async getAddressFromCoordinates(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ): Promise<Endereco> {
    const endereco = await this.mapQuestService.getAddressFromCoordinates(
      latitude,
      longitude,
    );
    return endereco;
  }
}
