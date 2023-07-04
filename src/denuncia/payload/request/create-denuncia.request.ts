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
@IsNotEmpty({ message: 'O campo "titulo" não pode estar vazio.' })
@IsString({ message: 'O campo "titulo" deve ser uma string.' })
titulo: string;

@ApiProperty({
example: 'Descrição da denúncia',
description: 'A descrição da denúncia',
type: String,
})
@IsNotEmpty({ message: 'O campo "descricao" não pode estar vazio.' })
@IsString({ message: 'O campo "descricao" deve ser uma string.' })
descricao: string;

@ApiProperty({
example: 40.7128,
description: 'A latitude da denúncia',
type: Number,
})
@IsNotEmpty({ message: 'O campo "latitude" não pode estar vazio.' })
@IsNumber({}, { message: 'O campo "latitude" deve ser um número.' })
@Min(-90.0, { message: 'O campo "latitude" deve ser maior ou igual a -90.0.' })
@Max(90.0, { message: 'O campo "latitude" deve ser menor ou igual a 90.0.' })
latitude: number;

@ApiProperty({
example: -74.006,
description: 'A longitude da denúncia',
type: Number,
})
@IsNotEmpty({ message: 'O campo "longitude" não pode estar vazio.' })
@IsNumber({}, { message: 'O campo "longitude" deve ser um número.' })
@Min(-180.0, { message: 'O campo "longitude" deve ser maior ou igual a -180.0.' })
@Max(180.0, { message: 'O campo "longitude" deve ser menor ou igual a 180.0.' })
longitude: number;

@ApiProperty({
type: DenuncianteRequest,
description: 'As informações do denunciante',
})
@IsNotEmpty({ message: 'O campo "denunciante" não pode estar vazio.' })
@ValidateNested()
@Type(() => DenuncianteRequest)
denunciante: DenuncianteRequest;
}