import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MapQuestService } from '../external/mapquest/mapquest.service';
import { DenunciaRequest } from './payload/request/create-denuncia.request';
import { DenunciaResponse } from './payload/response/create-denuncia.response';

@Injectable()
export class DenunciaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapQuestService: MapQuestService,
  ) {}

  async createDenuncia(
    denunciaRequest: DenunciaRequest,
  ): Promise<DenunciaResponse> {
    const { titulo, descricao, latitude, longitude, denunciante } =
      denunciaRequest;

    const endereco = await this.mapQuestService.getReverseGeocoding(
      latitude,
      longitude,
    );

    const denuncia = await this.prismaService.client.denuncia.create({
      data: {
        titulo,
        descricao,
        latitude,
        longitude,
        denunciante: {
          create: denunciante,
        },
        enderecoCep: {
          create: endereco,
        },
      },
      include: {
        denunciante: true,
        enderecoCep: true,
      },
    });

    return {
      id: denuncia.id,
      titulo: denuncia.titulo,
      descricao: denuncia.descricao,
      denunciante: denuncia.denunciante,
      endereco: denuncia.enderecoCep,
    };
  }
}
