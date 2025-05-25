# eFix API (Backend)

API REST criada com NestJS e PostgreSQL para gerenciamento de sugestões de solução para erros de comunicação com serviços do governo (como eSocial e Reinf), conforme projeto de processo seletivo.

## 🚀 Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Docker](https://www.docker.com/)

## 📖 Estrutura do projeto

```bash
src/
├── app.module.ts
├── main.ts
├── suggestions/
│   ├── suggestions.module.ts
│   ├── suggestions.controller.ts
│   ├── suggestions.service.ts
│   ├── dto/
├── evaluations/
│   ├── evaluations.module.ts
│   ├── evaluations.controller.ts
│   ├── evaluations.service.ts
│   ├── dto/
└── prisma/
    ├── prisma.module.ts
    ├── prisma.service.ts
```

## 📁 Como rodar localmente

### Requisitos:

- Docker e Docker Compose instalados

### Passos:

```bash
# Clonar o repositório
git clone https://github.com/victorborges97/efix.git
cd efix/backend

# Subir containers com banco PostgreSQL
docker-compose up -d

# Instalar dependências
npm install

# Gerar schemas
npx prisma generate

# Rodar a aplicação
npm run start:dev
```

A API ficará disponível em `http://localhost:3000`
O Swagger ficará disponível em `http://localhost:3000/api`

## 📂 Variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/efix-alterdata"
```

## ✍️ Convenção de commits

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/):

| Tipo     | Descrição                             |
| -------- | ------------------------------------- |
| feat     | Nova funcionalidade                   |
| fix      | Correção de bug                       |
| chore    | Mudanças de infraestrutura ou config  |
| docs     | Documentação                          |
| test     | Adição ou ajuste de testes            |
| refactor | Refatoramento sem mudar comportamento |

## 🔗 Frontend

Repositório: [frontend](https://github.com/victorborges97/efix)

## 👥 Contato

Repositório mantido para o processo seletivo. Compartilhado com a usuária **PatriciaSendon** no GitHub.
