import { Module } from '@nestjs/common';
import { DenunciaModule } from './denuncia/denuncia.module';
import { PrismaModule } from './prisma/prisma.module';
import { MapQuestModule } from './external/mapquest/mapquest.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    DenunciaModule,
    PrismaModule,
    MapQuestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
