import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDenunciaRequest {
  @ApiPropertyOptional({
    example: 'Título atualizado',
    description: 'O título atualizado da denúncia',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  titulo?: string;

  @ApiPropertyOptional({
    example: 'Descrição atualizada',
    description: 'A descrição atualizada da denúncia',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  descricao?: string;

  @ApiPropertyOptional({
    example: 'Nome atualizado',
    description: 'O nome atualizado do denunciante',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({
    example: 'CPF atualizado',
    description: 'O CPF atualizado do denunciante',
    pattern: '/^(d{3}.?d{3}.?d{3}-?d{2})$/',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  cpf?: string;
}
