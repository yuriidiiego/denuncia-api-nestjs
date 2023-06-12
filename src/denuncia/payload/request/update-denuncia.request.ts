import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDenunciaRequest {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  cpf?: string;
}
