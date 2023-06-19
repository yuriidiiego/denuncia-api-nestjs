import { ApiProperty } from '@nestjs/swagger';
import { Denunciante, Endereco } from '@prisma/client';

export class DenunciaResponse {
  @ApiProperty({ example: 1, description: 'O ID da denúncia' })
  id: number;

  @ApiProperty({
    example: 'Título da denúncia',
    description: 'O título da denúncia',
  })
  titulo: string;

  @ApiProperty({
    example: 'Descrição da denúncia',
    description: 'A descrição da denúncia',
  })
  descricao: string;

  @ApiProperty({
    description: 'Informações sobre o denunciante',
    example: {
      nome: 'Nome do denunciante',
      cpf: '123.456.789-00',
    },
  })
  denunciante: Denunciante;

  @ApiProperty({
    description: 'Informações sobre o endereço',
    example: {
      cep: '12345678',
      rua: 'Rua teste',
      bairro: 'Bairro teste',
      cidade: 'Cidade teste',
      estado: 'Estado teste',
      pais: 'País teste',
    },
  })
  endereco: Endereco;
}
