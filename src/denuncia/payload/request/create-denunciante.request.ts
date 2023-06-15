import { IsNotEmpty, IsString } from 'class-validator';
import { IsCPF } from '../../../common/decorators/is-cpf/is-cpf.decorator';

export class DenuncianteRequest {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  @IsCPF()
  cpf: string;
}
