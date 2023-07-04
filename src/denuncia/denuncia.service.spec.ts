import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MapQuestService } from '../external/mapquest/mapquest.service';
import { PrismaService } from '../prisma/prisma.service';
import { DenunciaNotFoundException } from './denuncia-not-found.exception';
import { DenunciaMapper } from './denuncia.mapper';
import { DenunciaService } from './denuncia.service';
import { DenunciaRequest } from './payload/request/create-denuncia.request';
import { UpdateDenunciaRequest } from './payload/request/update-denuncia.request';

const fakeDenuncias = [
  {
    id: 1,
    titulo: 'Título da denúncia 1',
    descricao: 'Descrição da denúncia 1',
    denunciante: {
      id: 1,
      nome: 'Nome do denunciante 1',
      cpf: '123.456.789-00',
    },
    endereco: {
      cep: '12345678',
      logradouro: 'Rua teste 1',
      bairro: 'Bairro teste 1',
      cidade: 'Cidade teste 1',
      estado: 'Estado teste 1',
      pais: 'País teste 1',
    },
  },
];

const fakeDenunciaRequest: DenunciaRequest = {
  titulo: 'Título da denúncia',
  descricao: 'Descrição da denúncia',
  latitude: 40.7128,
  longitude: -74.006,
  denunciante: {
    nome: 'Nome do denunciante',
    cpf: '123.456.789-00',
  },
};

const fakeUpdateDenunciaRequest: UpdateDenunciaRequest = {
  titulo: 'Título atualizado',
};

describe('DenunciaService', () => {
  let service: DenunciaService;
  let prisma: PrismaService;
  let mapQuestService: MapQuestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DenunciaService,
        {
          provide: PrismaService,
          useValue: {
            denuncia: {
              findMany: jest.fn().mockResolvedValue(fakeDenuncias),
              findUnique: jest.fn().mockResolvedValue(fakeDenuncias[0]),
              delete: jest.fn(),
              update: jest.fn().mockResolvedValue(fakeDenuncias[0]),
              create: jest.fn().mockResolvedValue(fakeDenuncias[0]),
            },
          },
        },
        {
          provide: MapQuestService,
          useValue: {
            getAddressFromCoordinates: jest
              .fn()
              .mockResolvedValue(fakeDenuncias[0].endereco),
          },
        },
        {
          provide: DenunciaMapper,
          useValue: {
            mapToResponse: jest.fn().mockReturnValue(fakeDenuncias[0]),
          },
        },
      ],
    }).compile();

    service = module.get<DenunciaService>(DenunciaService);
    prisma = module.get<PrismaService>(PrismaService);
    mapQuestService = module.get<MapQuestService>(MapQuestService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createDenuncia', () => {
    it('deve criar uma denúncia', async () => {
      jest.spyOn(mapQuestService, 'getAddressFromCoordinates');

      const result = await service.createDenuncia(fakeDenunciaRequest);

      expect(mapQuestService.getAddressFromCoordinates).toHaveBeenCalledWith(
        fakeDenunciaRequest.latitude,
        fakeDenunciaRequest.longitude,
      );
      expect(prisma.denuncia.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          titulo: fakeDenunciaRequest.titulo,
          descricao: fakeDenunciaRequest.descricao,
          latitude: fakeDenunciaRequest.latitude,
          longitude: fakeDenunciaRequest.longitude,
          denunciante: {
            create: fakeDenunciaRequest.denunciante,
          },
          enderecoCep: {
            create: fakeDenuncias[0].endereco,
          },
        }),
        include: expect.objectContaining({
          denunciante: true,
          enderecoCep: true,
        }),
      });
      expect(result).toEqual(fakeDenuncias[0]);
    });
  });

  describe('getDenuncias', () => {
    it('deve retornar todas as denúncias', async () => {
      const result = await service.getDenuncias();

      expect(prisma.denuncia.findMany).toHaveBeenCalledWith({
        include: expect.objectContaining({
          denunciante: true,
          enderecoCep: true,
        }),
      });
      expect(result).toEqual(fakeDenuncias);
    });
  });

  describe('getDenunciaById', () => {
    it('deve retornar a denúncia com o ID fornecido', async () => {
      const denunciaId = 1;
      const result = await service.getDenunciaById(denunciaId);

      expect(prisma.denuncia.findUnique).toHaveBeenCalledWith({
        where: { id: denunciaId },
      });
      expect(result).toEqual(fakeDenuncias[0]);
    });

    it('deve lancar uma NotFoundException quando a denúncia não for encontrada', async () => {
      const denunciaId = 999;
      jest.spyOn(prisma.denuncia, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.getDenunciaById(denunciaId)).rejects.toThrow(
        DenunciaNotFoundException,
      );
    });
  });

  describe('deleteDenuncia', () => {
    it('deve deletar a denúncia com o ID fornecido', async () => {
      const denunciaId = 1;
      jest
        .spyOn(service, 'getDenunciaById')
        .mockResolvedValueOnce(fakeDenuncias[0]);

      await service.deleteDenuncia(denunciaId);

      expect(service.getDenunciaById).toHaveBeenCalledWith(denunciaId);
      expect(prisma.denuncia.delete).toHaveBeenCalledWith({
        where: { id: denunciaId },
      });
    });

    it('deve lançar uma NotFoundException quando a denúncia não for encontrada', async () => {
      const denunciaId = 999;
      jest
        .spyOn(service, 'getDenunciaById')
        .mockRejectedValueOnce(new DenunciaNotFoundException(denunciaId));

      await expect(service.deleteDenuncia(denunciaId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateDenuncia', () => {
    it('deve atualizar a denúncia com o ID fornecido', async () => {
      const denunciaId = 1;
      jest
        .spyOn(service, 'getDenunciaById')
        .mockResolvedValueOnce(fakeDenuncias[0]);

      const result = await service.updateDenuncia(
        denunciaId,
        fakeUpdateDenunciaRequest,
      );

      expect(service.getDenunciaById).toHaveBeenCalledWith(denunciaId);
      expect(prisma.denuncia.update).toHaveBeenCalledWith({
        where: { id: denunciaId },
        data: fakeUpdateDenunciaRequest,
      });
      expect(result).toEqual(fakeDenuncias[0]);
    });

    it('deve lancar uma NotFoundException quando a denúncia não for encontrada', async () => {
      const denunciaId = 999;
      jest
        .spyOn(service, 'getDenunciaById')
        .mockRejectedValueOnce(new DenunciaNotFoundException(denunciaId));

      await expect(
        service.updateDenuncia(denunciaId, fakeUpdateDenunciaRequest),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
