# Denúncia API 🚨

Este projeto consiste em um sistema de denúncias, desenvolvido utilizando o framework NestJS. O objetivo principal é fornecer uma plataforma para que os usuários possam enviar denúncias sobre determinados incidentes. 🔒

## Tecnologias Utilizadas 🛠️

| Tecnologia | Descrição                                                                                      |
|------------|-----------------------------------------------------------------------------------------------|
| NestJS     | Framework para construção de aplicativos Node.js eficientes e escaláveis. 🦅                   |
| PostgreSQL | Banco de dados relacional utilizado para armazenar os dados da aplicação. 🐘                    |
| Prisma     | ORM (Object-Relational Mapping) utilizado para interagir com o banco de dados PostgreSQL. 🎯    |
| Swagger    | Ferramenta utilizada para gerar a documentação da API. 📚                                      |
| Bcrypt     | Biblioteca para hashing de senhas. 🔒                                                         |
| Passport   | Middleware de autenticação para autenticação de usuários. 🗝️                                 |
| JSON Web Token (JWT) | Método de autenticação stateless que utiliza tokens assinados para verificar a identidade dos usuários. 🔑 |

## Endpoints da API 🚦

A tabela abaixo lista todos os endpoints disponíveis na API, juntamente com os métodos, rotas, autenticação e payloads correspondentes. 📝

| Endpoint                 | Método | Rota                | Autenticação  | Payload                                                                                                   | Descrição                                         |
|--------------------------|--------|---------------------|---------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------|
| Cadastro de Usuário      | ✅ POST   | /usuario/cadastro   | ❌ Nenhum        | `{"name": "string", "email": "string", "password": "string"}`                                             | Cria um novo usuário na aplicação                  |
| Login                    | ✅ POST   | /auth/login         | ❌ Nenhum        | `{"email": "string", "password": "string"}`                                                               | Autentica um usuário existente                     |
| Criar uma Denúncia       | ✅ POST   | /denuncia           | 🔑 Bearer Token  | `{"titulo": "string", "descricao": "string", "latitude": 0, "longitude": 0, "denunciante": {...}}`       | Cria uma nova denúncia                            |
| Obter Todas as Denúncias | ✅ GET    | /denuncia           | 🔑 Bearer Token  | ❌ Nenhum                                                                                                    | Retorna todas as denúncias cadastradas             |
| Obter uma Denúncia       | ✅ GET    | /denuncia/{id}      | 🔑 Bearer Token  | ❌ Nenhum                                                                                                    | Retorna uma denúncia específica                   |
| Excluir uma Denúncia     | ✅ DELETE | /denuncia/{id}      | 🔑 Bearer Token  | ❌ Nenhum                                                                                                    | Exclui uma denúncia pelo ID especificado           |
| Atualizar uma Denúncia   | ✅ PATCH  | /denuncia/{id}      | 🔑 Bearer Token  | Objeto com informações da denúncia a ser atualizada                                                      | Atualiza uma denúncia pelo ID especificado         |

## Executando o Projeto ▶️

Siga as etapas abaixo para executar o projeto em seu ambiente de desenvolvimento:

1. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.
2. Clone o repositório do projeto.
3. Acesse o diretório do projeto.
4. Execute o comando `docker-compose up -d` para iniciar os containers do projeto.

5. Após iniciar o projeto, você pode testar a API de denúncia de duas maneiras:

    - **Swagger**: Acesse a [documentação da API](http://localhost:3000/denuncia-api) para visualizar todos os endpoints, métodos, autenticação e payloads disponíveis. O Swagger fornece uma interface interativa para testar e explorar a API.

    - **Postman**: Importe o arquivo `Denuncia.postman_collection` que está localizado na pasta principal do projeto NestJS para o Postman. O arquivo contém uma coleção de requisições pré-configuradas para os endpoints da API. Você pode usar essas requisições para testar a API diretamente no Postman.

Essas duas opções permitem que você interaja com a API e teste suas funcionalidades. Escolha a opção que melhor atenda às suas necessidades.
