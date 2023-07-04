import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsRequest {
  @IsNotEmpty({ message: 'O campo "email" não pode estar vazio.' })
  @IsString({ message: 'O campo "email" deve ser uma string.' })
  @ApiProperty({ example: 'example@example.com', description: 'Endereço de e-mail' })
  email: string;

  @IsNotEmpty({ message: 'O campo "password" não pode estar vazio.' })
  @IsString({ message: 'O campo "password" deve ser uma string.' })
  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  password: string;
}
