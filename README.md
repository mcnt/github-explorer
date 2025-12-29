# GitHub Explorer

Aplicativo full-stack para explorar repositórios do GitHub com autenticação de usuário e recursos de administração.

## 🚀 Tecnologias

### Backend
- Node.js com TypeScript
- Express.js
- Prisma ORM
- SQLite (desenvolvimento)
- Autenticação JWT
- Integração com API do GitHub

### Frontend
- Vue 3 com Composition API
- TypeScript
- Vue Router
- Axios para requisições HTTP
- SCSS para estilização
- Vite como ferramenta de build

## 🛠️ Configuração do Projeto

### Pré-requisitos
- Node.js (versão LTS recomendada)
- npm ou yarn
- Git

### Configuração do Backend

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o .env com suas configurações
   ```

4. Execute as migrações do banco de dados:
   ```bash
   npm run migrate
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   A API estará disponível em `http://localhost:3000`

### Configuração do Frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o .env com a URL da sua API
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O aplicativo estará disponível em `http://localhost:5173`

## 👨‍💼 Usuário Administrador Padrão

Na primeira inicialização, o sistema cria automaticamente um usuário administrador com as seguintes credenciais (configuráveis no `.env`):

- **E-mail**: admin@example.com
- **Senha**: admin123

**Importante**: Altere essas credenciais padrão em produção.

## 🧠 Decisões Técnicas

### Backend

1. **Arquitetura**:
   - Estrutura modular com separação clara de responsabilidades
   - Autenticação baseada em middleware
   - Camada de serviço para lógica de negócios
   - Padrão de repositório com Prisma

2. **Autenticação**:
   - Autenticação baseada em JWT com tokens de atualização
   - Controle de acesso baseado em funções (RBAC)
   - Hash seguro de senhas com bcrypt

3. **Banco de Dados**:
   - SQLite para desenvolvimento (fácil configuração)
   - Prisma para acesso tipado ao banco de dados
   - Migrações para alterações de esquema

4. **Design da API**:
   - Endpoints RESTful
   - Tratamento consistente de erros
   - Validação de requisições

### Frontend

1. **Arquitetura**:
   - Arquitetura baseada em componentes
   - Composition API para melhor organização do código
   - Gerenciamento de estado centralizado com Pinia (recomendado para o futuro)

2. **UI/UX**:
   - Design responsivo
   - Componentes reutilizáveis
   - Estados de carregamento e tratamento de erros

3. **Gerenciamento de Estado**:
   - Estado local do componente para dados específicos da UI
   - Serviços para comunicação com a API
   - Divisão de código baseada em rotas

## 🚀 Implantação

### Backend
- Configure o banco de dados em produção (PostgreSQL/MySQL)
- Configure as variáveis de ambiente em produção
- Use PM2 ou gerenciador de processos similar

### Frontend
- Construa para produção:
  ```bash
  npm run build
  ```
- Faça deploy no Vercel, Netlify ou qualquer hospedagem estática

## 📈 Pontos de Melhoria

### Backend

1. **Desempenho**:
   - Implementar cache com Redis
   - Adicionar limitação de taxa (rate limiting)
   - Otimizar consultas ao banco de dados

2. **Segurança**:
   - Adicionar validação de requisições
   - Implementar CORS corretamente
   - Adicionar limitação de taxa
   - Sanitização de entrada

3. **Testes**:
   - Adicionar testes unitários com Jest
   - Testes de integração para endpoints da API
   - Testes E2E

4. **Funcionalidades**:
   - WebSocket para atualizações em tempo real
   - Upload de arquivos
   - Melhor registro de erros

### Frontend

1. **Gerenciamento de Estado**:
   - Implementar Pinia para estado global
   - Melhor tratamento de erros

2. **UI/UX**:
   - Skeletons de carregamento
   - Melhores estados de erro
   - Validação de formulários
   - Melhorias de acessibilidade

3. **Testes**:
   - Testes unitários com Vitest
   - Testes de componentes
   - Testes E2E com Cypress

4. **Desempenho**:
   - Divisão de código (code splitting)
   - Carregamento preguiçoso de rotas
   - Otimização de imagens
