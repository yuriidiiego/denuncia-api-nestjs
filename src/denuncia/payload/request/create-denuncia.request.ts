import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { DenuncianteRequest } from './create-denunciante.request';

export class DenunciaRequest {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90.0)
  @Max(90.0)
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180.0)
  @Max(180.0)
  longitude: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DenuncianteRequest)
  denunciante: DenuncianteRequest;
}
