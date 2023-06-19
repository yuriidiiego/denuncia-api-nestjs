import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Endereco } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { AddressRetrievalFailedException } from './address-retrieval-failed.exception';
import { MapQuestMapper } from './mapquest.mapper';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MapQuestService {
  private readonly mapQuestUrl: string;
  private readonly mapQuestKey: string;
  private readonly logger = new Logger(MapQuestService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly mapper: MapQuestMapper,
  ) {
    this.mapQuestUrl = this.configService.get('MAPQUEST_URL');
    this.mapQuestKey = this.configService.get('MAPQUEST_KEY');
  }

  async getAddressFromCoordinates(
    lat: number,
    long: number,
  ): Promise<Endereco> {
    try {
      const url = this.buildUrl(lat, long);
      this.logger.debug(
        `Requisitando endereço para coordenadas: ${lat}, ${long}`,
      );

      const response: AxiosResponse = await this.fetchResponse(url);
      const address = this.mapper.mapLocationToAddress(response.data);

      this.logger.debug(
        'Endereço recuperado com sucesso da API do MapQuest:',
        JSON.stringify(address),
      );
      return address;
    } catch (error) {
      throw new AddressRetrievalFailedException();
    }
  }

  private buildUrl(lat: number, long: number) {
    return `${this.mapQuestUrl}${this.mapQuestKey}&location=${lat},${long}`;
  }

  private async fetchResponse(url: string): Promise<AxiosResponse> {
    return firstValueFrom(this.httpService.get(url));
  }
}
