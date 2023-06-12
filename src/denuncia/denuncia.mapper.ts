import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DenunciaResponse } from './payload/response/create-denuncia.response';
import { Denuncia } from '@prisma/client';

@Injectable()
export class DenunciaMapper {
  mapToResponse(denuncia: Denuncia): DenunciaResponse {
    return plainToClass(DenunciaResponse, denuncia);
  }
}
