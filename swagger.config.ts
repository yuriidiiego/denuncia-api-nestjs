import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Denuncia API')
    .setDescription(
      'Este projeto consiste em um sistema de denúncias, desenvolvido utilizando o framework NestJS. O objetivo principal é fornecer uma plataforma para que os usuários possam enviar denúncias sobre determinados incidentes.',
    )
    .setContact(
      'Yuri Nascimento',
      'https://github.com/yuriidiiego',
      'yuriidiiego@gmail.com',
    )
    .setLicense('Apache 2.0', 'https://www.apache.org/licenses/LICENSE-2.0')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('denuncia', app, document);
}
