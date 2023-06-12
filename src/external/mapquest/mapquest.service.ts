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
    latitude: number,
    longitude: number,
  ): Promise<Endereco> {
    try {
      const url = this.buildUrl(latitude, longitude);
      this.logger.debug(
        `Requesting address for coordinates: ${latitude}, ${longitude}`,
      );

      const response: AxiosResponse = await this.fetchResponse(url);
      const address = this.mapper.mapLocationToAddress(response.data);

      this.logger.debug(
        'Successfully retrieved address from MapQuest API:',
        JSON.stringify(address),
      );
      return address;
    } catch (error) {
      this.logger.error('Failed to retrieve address from MapQuest API:', error);
      throw new AddressRetrievalFailedException();
    }
  }

  private buildUrl(latitude: number, longitude: number) {
    return `${this.mapQuestUrl}${this.mapQuestKey}&location=${latitude},${longitude}`;
  }

  private async fetchResponse(url: string): Promise<AxiosResponse> {
    return firstValueFrom(this.httpService.get(url));
  }
}
