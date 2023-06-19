import { IsNotEmpty, IsString } from 'class-validator';
import { IsCPF } from '../../../common/decorators/is-cpf/is-cpf.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class DenuncianteRequest {
  @ApiProperty({
    example: 'Nome do denunciante',
    description: 'O nome do denunciante',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'O CPF do denunciante',
    pattern: '/^(d{3}.?d{3}.?d{3}-?d{2})$/',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsCPF()
  cpf: string;
}
