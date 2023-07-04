import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRegisterRequest } from './payload/request/user-register.request';
import { UserResponse } from './payload/response/user.response';
import { UserService } from './user.service';

@ApiTags('Usuários')
@Controller('usuario')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/cadastro')
  @ApiOperation({
    summary: 'Cadastra um novo usuário',
    description: 'Cadastra um novo usuário no sistema',
    operationId: 'register',
  })
  @ApiCreatedResponse({
    description: 'Usuário cadastrado com sucesso',
    type: UserRegisterRequest,
    status: 201,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos no corpo da requisição',
  })
  @ApiConflictResponse({ description: 'Email já cadastrado', status: 409 })
  async register(@Body() register: UserRegisterRequest): Promise<UserResponse> {
    return this.userService.register(register);
  }
}