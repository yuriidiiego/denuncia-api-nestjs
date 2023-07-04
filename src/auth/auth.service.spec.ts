import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthCredentialsRequest } from './payload/request/auth-credentials.request';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedToken'),
          },
        },
        {
          provide: UserService,
          useValue: {
            validateUserCredentials: jest.fn().mockResolvedValue({
              id: 1,
              name: 'John Doe',
              email: 'johndoe@example.com',
            }),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('deve retornar o token de acesso ao efetuar login com sucesso', async () => {
      const credentials: AuthCredentialsRequest = {
        email: 'johndoe@example.com',
        password: 'password',
      };

      const result = await authService.login(credentials);

      expect(userService.validateUserCredentials).toHaveBeenCalledWith(
        credentials.email,
        credentials.password,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({ userId: 1 });
      expect(result).toEqual({ accessToken: 'mockedToken' });
    });
  });

  describe('createJwtPayload', () => {
    it('deve criar o payload JWT', () => {
      const payload = authService.createJwtPayload(1);
      expect(payload).toEqual({ userId: 1 });
    });
  });

  describe('generateAccessToken', () => {
    it('deve gerar o token de acesso usando o serviço JWT', () => {
      const payload = { userId: 1 };
      const accessToken = authService.generateAccessToken(payload);
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(accessToken).toEqual('mockedToken');
    });
  });
});
