import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsRequest } from './payload/request/auth-credentials.request';
import { JwtLoginTokenResponse } from './payload/response/jwt-login-token.response';

@ApiTags('Autenticações')
@Controller('autenticacao')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Realiza o login do usuário',
    description: 'Realiza o login do usuário no sistema',
    operationId: 'login',
  })
  @ApiCreatedResponse({
    description: 'Login realizado com sucesso',
    type: AuthCredentialsRequest,
    status: 201,
  })
  @ApiUnauthorizedResponse({
    description:
      'E-mail ou senha inválidos. Por favor, forneça credenciais válidas',
  })
  async login(
    @Body() authCredentials: AuthCredentialsRequest,
  ): Promise<JwtLoginTokenResponse> {
    return this.authService.login(authCredentials);
  }
}
