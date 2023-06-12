import { Injectable } from '@nestjs/common';
import { Endereco } from '@prisma/client';
import { MapQuestService } from '../external/mapquest/mapquest.service';
import { PrismaService } from '../prisma/prisma.service';
import { DenunciaNotFoundException } from './denuncia-not-found.exception';
import { DenunciaMapper } from './denuncia.mapper';
import { DenunciaRequest } from './payload/request/create-denuncia.request';
import { DenuncianteRequest } from './payload/request/create-denunciante.request';
import { UpdateDenunciaRequest } from './payload/request/update-denuncia.request';
import { DenunciaResponse } from './payload/response/create-denuncia.response';

@Injectable()
export class DenunciaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapQuestService: MapQuestService,
    private readonly denunciaMapper: DenunciaMapper,
  ) {}

  async createDenuncia(
    denunciaRequest: DenunciaRequest,
  ): Promise<DenunciaResponse> {
    const { titulo, descricao, latitude, longitude, denunciante } =
      denunciaRequest;

    const endereco = await this.mapQuestService.getAddressFromCoordinates(
      latitude,
      longitude,
    );

    const createdDenuncia = await this.createdDenuncia(
      titulo,
      descricao,
      latitude,
      longitude,
      denunciante,
      endereco,
    );

    return this.denunciaMapper.mapToResponse(createdDenuncia);
  }

  async getDenuncias(): Promise<DenunciaResponse[]> {
    const denuncias = await this.prismaService.denuncia.findMany({
      include: {
        denunciante: true,
        enderecoCep: true,
      },
    });

    return denuncias.map((denuncia) =>
      this.denunciaMapper.mapToResponse(denuncia),
    );
  }

  async getDenunciaById(id: number): Promise<DenunciaResponse> {
    const denuncia = await this.prismaService.denuncia.findUnique({
      where: { id: Number(id) },
    }).then((denuncia) => {
      if (!denuncia) {
        throw new DenunciaNotFoundException(id);
      }
      return this.denunciaMapper.mapToResponse(denuncia);
    });
  
    return denuncia;
  }
  

  async deleteDenuncia(id: number): Promise<void> {
    await this.getDenunciaById(id);
    await this.prismaService.denuncia.delete({
      where: { id: Number(id) },
    });
  }

  async updateDenuncia(
    id: number,
    updateRequest: UpdateDenunciaRequest,
  ): Promise<DenunciaResponse> {
    await this.getDenunciaById(id);
    await this.prismaService.denuncia.update({
      where: { id: Number(id) },
      data: updateRequest,
    });

    return this.getDenunciaById(id);
  }

  private async createdDenuncia(
    titulo: string,
    descricao: string,
    latitude: number,
    longitude: number,
    denunciante: DenuncianteRequest,
    endereco: Endereco,
  ) {
    return await this.prismaService.denuncia.create({
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
  }
}
