# Frontend (Vue 3 + Vite + TypeScript)

Aplicação web responsável por autenticação (login/cadastro) e telas de dashboard/usuários.

## Requisitos

- Node.js (LTS recomendado)
- npm

## Setup

1. Instale as dependências

```bash
npm install
```

2. Configure a URL da API

Arquivo `.env`:

```bash
VITE_API_URL=http://localhost:3000
```

3. Suba o projeto

```bash
npm run dev
```

Por padrão: `http://localhost:5173`.

## Rotas

- `/login` (pública)
- `/register` (pública)
- `/` (dashboard, requer autenticação)
- `/users` (somente admin)

## Integração com a API

- O Axios fica em `src/services/api.ts`
  - usa `VITE_API_URL` como `baseURL`
  - injeta `Authorization: Bearer <token>` automaticamente quando existir token

## Autenticação

- Login: `POST /api/auth/login`
- Cadastro: `POST /api/auth/register`

O token e o usuário ficam no `localStorage` via `src/utils/auth.ts`.

## Decisões técnicas

- Vue Router com `beforeEach` para proteger rotas privadas.
- Controle de acesso por role via `meta.role` (ex: `/users` somente admin).
- `axios` centralizado em `src/services/api.ts` com interceptor para injetar JWT.

## Pontos de melhoria

- Curto prazo
  - Melhorar UX de erros (mensagens por status code) e loading states.
  - Validação de formulários (ex: regras por campo + mensagens consistentes).
  - Melhorar feedback de permissões (ex: quando user tenta acessar `/users`).

- Médio prazo
  - Testes de componentes e e2e.
  - Padronizar componentes de formulário (validação e máscaras).
  - Acessibilidade (labels, foco, navegação por teclado, aria).

- Longo prazo
  - Observabilidade no front (logging de erros + tracing de navegação).
  - Cache de requests (ex: GitHub) e debounce de busca.
  - Paginação/virtualização da lista de repositórios.

## Checklist (requisitos do teste)

- **Login** com armazenamento de token.
- **Rotas protegidas** (auth guard) e **role guard**.
- **Dashboard**: busca usuário do GitHub e lista repositórios.
- **Gestão de usuários (admin)**: listar/criar/excluir.

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```
