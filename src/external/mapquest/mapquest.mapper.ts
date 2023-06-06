import { Injectable } from '@nestjs/common';
import { Endereco } from '@prisma/client';

@Injectable()
export class MapQuestMapper {
  public mapResponseToResult(data: any): Endereco {
    const location = data.results[0]?.locations[0];

    return {
      cep: location?.postalCode,
      logradouro: location?.street,
      bairro: location?.adminArea6,
      cidade: location?.adminArea5,
      estado: location?.adminArea3,
      pais: location?.adminArea1,
    };
  }
}
