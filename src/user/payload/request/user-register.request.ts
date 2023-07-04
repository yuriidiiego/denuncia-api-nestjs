import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { IsUniqueEmail } from "../../../common/decorators/email/is-unique-email.decorator";


export class UserRegisterRequest {
  @IsNotEmpty({ message: 'O campo "name" não pode estar vazio.' })
  @IsString({ message: 'O campo "name" deve ser uma string.' })
  @ApiProperty({ example: 'João', description: 'Nome do usuário' })
  name: string;

  @IsNotEmpty({ message: 'O campo "email" não pode estar vazio.' })
  @IsEmail({}, { message: 'O campo "email" deve ser um email válido.' })
  @IsUniqueEmail()
  @ApiProperty({ example: 'example@example.com', description: 'Endereço de e-mail' })
  email: string;

  @IsNotEmpty({ message: 'O campo "password" não pode estar vazio.' })
  @IsString({ message: 'O campo "password" deve ser uma string.' })
  @MinLength(6, {
    message: 'O campo "password" deve ter no mínimo 6 caracteres.',
  })
  @ApiProperty({ example: 'senha123', description: 'Senha do usuário (mínimo de 6 caracteres)' })
  password: string;
} 