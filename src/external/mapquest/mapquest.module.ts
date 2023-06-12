import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MapQuestService } from './mapquest.service';
import { MapQuestMapper } from './mapquest.mapper';
import { MapQuestController } from './mapquest.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [MapQuestController],
  providers: [MapQuestService, MapQuestMapper],
  exports: [MapQuestService],
})
export class MapQuestModule {}
