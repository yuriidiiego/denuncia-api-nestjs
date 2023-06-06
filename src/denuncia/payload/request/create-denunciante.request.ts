import { IsNotEmpty, IsString } from 'class-validator';

export class DenuncianteRequest {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;
}
