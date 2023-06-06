import { Denunciante, Endereco } from '@prisma/client';

export class DenunciaResponse {
  id: number;
  titulo: string;
  descricao: string;
  denunciante: Denunciante;
  endereco: Endereco;
}
