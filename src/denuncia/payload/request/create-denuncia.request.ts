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
import { ApiProperty } from '@nestjs/swagger';

export class DenunciaRequest {
  @ApiProperty({
    example: 'Título da denúncia',
    description: 'O título da denúncia',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty({
    example: 'Descrição da denúncia',
    description: 'A descrição da denúncia',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @ApiProperty({
    example: 40.7128,
    description: 'A latitude da denúncia',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(-90.0)
  @Max(90.0)
  latitude: number;

  @ApiProperty({ example: -74.006, description: 'A longitude da denúncia', type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Min(-180.0)
  @Max(180.0)
  longitude: number;

  @ApiProperty({
    type: DenuncianteRequest,
    description: 'As informações do denunciante',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DenuncianteRequest)
  denunciante: DenuncianteRequest;
}
