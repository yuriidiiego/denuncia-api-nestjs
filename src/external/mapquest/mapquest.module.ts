import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MapQuestService } from './mapquest.service';
import { MapQuestMapper } from './mapquest.mapper';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [MapQuestService, MapQuestMapper],
  exports: [MapQuestService],
})
export class MapQuestModule {}
