import { Module } from '@nestjs/common';

import { DenunciaController } from './denuncia.controller';
import { DenunciaMapper } from './denuncia.mapper';
import { DenunciaService } from './denuncia.service';
import { MapQuestModule } from '../external/mapquest/mapquest.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, MapQuestModule],
  controllers: [DenunciaController],
  providers: [DenunciaService, DenunciaMapper,],
})
export class DenunciaModule {}
