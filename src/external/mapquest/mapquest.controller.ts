import { Controller, Get, Query } from '@nestjs/common';
import { MapQuestService } from './mapquest.service';
import { Endereco } from '@prisma/client';

@Controller('endereco')
export class MapQuestController {
  constructor(private readonly mapQuestService: MapQuestService) {}

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
