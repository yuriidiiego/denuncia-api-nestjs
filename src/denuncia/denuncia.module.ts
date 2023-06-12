import { Module } from '@nestjs/common';
import { DenunciaController } from './denuncia.controller';
import { DenunciaService } from './denuncia.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MapQuestModule } from '../external/mapquest/mapquest.module';
import { DenunciaMapper } from './denuncia.mapper';

@Module({
  imports: [PrismaModule, MapQuestModule],
  controllers: [DenunciaController],
  providers: [DenunciaService, DenunciaMapper],
})
export class DenunciaModule {}
