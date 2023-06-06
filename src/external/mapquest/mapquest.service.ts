import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Endereco } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { MapQuestMapper } from './mapquest.mapper';

@Injectable()
export class MapQuestService {
  private readonly mapQuestUrl: string;
  private readonly mapQuestKey: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
    private readonly mapper: MapQuestMapper,
  ) {
    this.mapQuestUrl = configService.get('MAPQUEST_URL');
    this.mapQuestKey = configService.get('MAPQUEST_KEY');
  }

  async getReverseGeocoding(
    latitude: number,
    longitude: number,
  ): Promise<Endereco> {
    const url = this.buildUrl(latitude, longitude);
    const response: AxiosResponse = await this.getResponseFromUrl(url);

    return this.mapper.mapResponseToResult(response.data);
  }

  private buildUrl(latitude: number, longitude: number) {
    return `${this.mapQuestUrl}${this.mapQuestKey}&location=${latitude},${longitude}`;
  }

  private async getResponseFromUrl(url: string): Promise<AxiosResponse> {
    return firstValueFrom(this.httpService.get(url));
  }
}
