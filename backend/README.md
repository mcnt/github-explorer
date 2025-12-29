 # Backend (Express + Prisma + SQLite)
 
 API em Node.js/TypeScript usando Express e Prisma (SQLite) com autenticação via JWT.
 
 ## Requisitos
 
 - Node.js (LTS recomendado)
 - npm
 
 ## Setup
 
 1. Instale as dependências
 
 ```bash
 npm install
 ```
 
 2. Crie o arquivo `.env`
 
 Use `.env.example` como base.
 
 3. Rode as migrations do Prisma
 
 ```bash
 npm run migrate
 ```
 
 4. Inicie o servidor em modo desenvolvimento
 
 ```bash
 npm run dev
 ```
 
 A API sobe, por padrão, em `http://localhost:3000`.
 
 ## Variáveis de ambiente
 
 - `PORT`
 - `DATABASE_URL` (SQLite)
 - `JWT_SECRET`
 - `JWT_EXPIRES_IN`
 - `ADMIN_NAME`
 - `ADMIN_EMAIL`
 - `ADMIN_PASSWORD`
 
 ## Seed de admin
 
 No bootstrap do servidor é executado um seed que cria um usuário admin (uma única vez) a partir de:
 
 - `ADMIN_EMAIL`
 - `ADMIN_PASSWORD`
 - `ADMIN_NAME` (opcional)
 
 Se o admin já existir no banco, o seed não recria nem atualiza a senha.

## Usuário admin padrão

O admin padrão é definido por variáveis de ambiente no `.env`.

Exemplo:

```bash
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@email.com
ADMIN_PASSWORD=123456
```
 
 ## Rotas
 
 Base URL: `/api`
 
 ### Auth
 
 - `POST /api/auth/login`
 
 Body:
 ```json
 { "email": "user@email.com", "password": "123456" }
 ```
 
 Resposta (200):
 ```json
 { "token": "...", "user": { "id": 1, "name": "...", "role": "user" } }
 ```
 
 - `POST /api/auth/register`
 
 Cria um usuário comum com `role: "user"`.
 
 Body:
 ```json
 { "name": "Maria", "email": "maria@email.com", "password": "123456" }
 ```
 
 Resposta (201):
 ```json
 { "token": "...", "user": { "id": 2, "name": "Maria", "role": "user" } }
 ```
 
 Erros comuns:
 
 - `400`: campos obrigatórios ausentes
 - `401`: credenciais inválidas
 - `409`: email já cadastrado
 
 ### Users
 
 - `GET /api/users` (admin)
 - `POST /api/users` (admin)
 - `DELETE /api/users/:id` (admin)
 
 Headers:
 
 - `Authorization: Bearer <token>`

### GitHub

Protegidas por JWT (requer login):

- `GET /api/github/users/:username`
- `GET /api/github/users/:username/repos`
 
 ## Prisma
 
 - Rodar migrations
 
 ```bash
 npm run migrate
 ```
 
 - Abrir Prisma Studio
 
 ```bash
 npm run studio
 ```

## Decisões técnicas

- Express + TypeScript com separação em camadas (`routes/controllers/services/middlewares`).
- Prisma com SQLite para simplificar setup local.
- JWT stateless para autenticação; role no payload para autorização (admin).
- `AppError` + `errorMiddleware` para padronizar respostas de erro.

## Pontos de melhoria

- Curto prazo
  - Validação de payload com schema (ex: zod/joi) em todas as rotas.
  - Padronizar respostas de erro com `code` além de `message`.
  - Usar `JWT_EXPIRES_IN` apenas por configuração e documentar formato.

- Médio prazo
  - Documentação OpenAPI/Swagger.
  - Rate limiting/caching para chamadas ao GitHub.
  - Logs estruturados (ex: pino) com correlação por request.

- Longo prazo
  - Testes (unit/integration) para services e rotas.
  - Observabilidade (tracing/metrics) e healthcheck.
  - Suporte a banco externo (MySQL/Postgres) em produção.

## Checklist (requisitos do teste)

- **Autenticação JWT**: `POST /api/auth/login`.
- **Senha com hash**: bcrypt no cadastro/admin seed.
- **Middleware auth**: protege rotas privadas.
- **Middleware admin**: protege `/api/users`.
- **Gestão de usuários**: listar/criar/excluir (admin).
- **Integração GitHub**: buscar usuário e listar repositórios.
- **Tratamento de erros**: `AppError` + `errorMiddleware`.
