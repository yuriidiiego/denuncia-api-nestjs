import { Module } from '@nestjs/common';
import { DenunciaController } from './denuncia.controller';
import { DenunciaService } from './denuncia.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MapQuestModule } from '../external/mapquest/mapquest.module';

@Module({
  imports: [PrismaModule, MapQuestModule],
  controllers: [DenunciaController],
  providers: [DenunciaService],
})
export class DenunciaModule {}
