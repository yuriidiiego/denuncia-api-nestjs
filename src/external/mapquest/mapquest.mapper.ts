import { Injectable } from '@nestjs/common';
import { Endereco } from '@prisma/client';

@Injectable()
export class MapQuestMapper {
  public mapLocationToAddress(data: MapQuestLocation): Endereco {
    return {
      cep: data.results[0].locations[0].postalCode,
      logradouro: data.results[0].locations[0].street,
      bairro: data.results[0].locations[0].adminArea6,
      cidade: data.results[0].locations[0].adminArea5,
      estado: data.results[0].locations[0].adminArea3,
      pais: data.results[0].locations[0].adminArea1,
    };
  }
}
