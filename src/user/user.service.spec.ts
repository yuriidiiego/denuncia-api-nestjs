import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { InvalidCredentialsException } from '../auth/auth-exceptions';
import { BcryptService } from '../auth/bcrypt.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let bcryptService: BcryptService;
  let userMapper: UserMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        BcryptService,
        UserMapper,
        UserService,
        JwtService,
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    bcryptService = module.get<BcryptService>(BcryptService);
    userMapper = module.get<UserMapper>(UserMapper);
    userService = module.get<UserService>(UserService);
  });
  describe('validateUserCredentials', () => {
    it('deve validar as credenciais do usuário e retornar o usuário se as credenciais forem válidas', async () => {
      const email = 'john@example.com';
      const password = 'password123';
      const hashedPassword = 'hashedPassword';

      const user = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(bcryptService, 'comparePasswords').mockResolvedValue(true);

      const result = await userService.validateUserCredentials(email, password);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(bcryptService.comparePasswords).toHaveBeenCalledWith(
        password,
        hashedPassword,
      );
      expect(result).toEqual(user);
    });

    it('deve lançar InvalidCredentialsException se as credenciais do usuário forem inválidas', async () => {
      const email = 'john@example.com';
      const password = 'password123';

      const user = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(bcryptService, 'comparePasswords').mockResolvedValue(false);

      await expect(
        userService.validateUserCredentials(email, password),
      ).rejects.toThrow(InvalidCredentialsException);
    });
  });

  describe('validateUserById', () => {
    it('deve validar e retornar o usuário pelo ID', async () => {
      const payload = {
        userId: 1,
      };

      const user = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(userMapper, 'mapToResponse').mockReturnValue(user);

      const result = await userService.validateUserById(payload);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: payload.userId },
      });
      expect(userMapper.mapToResponse).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });

    it('deve lançar NotFoundException se o usuário não for encontrado', async () => {
      const payload = {
        userId: 1,
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(userService.validateUserById(payload)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('register', () => {
    it('deve registrar um novo usuário e retornar a resposta mapeada', async () => {
      const registerRequest = {
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
      };

      const createdUser = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
      };

      jest
        .spyOn(bcryptService, 'hashPassword')
        .mockResolvedValue('hashedPassword');
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(createdUser);
      jest.spyOn(userMapper, 'mapToResponse').mockReturnValue({
        id: 1,
        name: 'John',
        email: 'john@example.com',
      });

      const result = await userService.register(registerRequest);

      expect(bcryptService.hashPassword).toHaveBeenCalledWith(
        registerRequest.password,
      );
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          name: registerRequest.name,
          email: registerRequest.email,
          password: 'hashedPassword',
        },
      });
      expect(userMapper.mapToResponse).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual({
        id: 1,
        name: 'John',
        email: 'john@example.com',
      });
    });
  });
});
