# 🛠️ eFix – Sistema de Gerenciamento de Soluções de Erros

Aplicação web completa (Frontend + Backend) para cadastrar e avaliar sugestões de solução para erros retornados por serviços do governo, como eSocial e Reinf.

Este projeto foi desenvolvido para um processo seletivo técnico e é composto por:

- **Backend**: NestJS, Prisma e PostgreSQL  
- **Frontend**: React (Vite), Tailwind CSS, ShadCN UI, Axios, React Hook Form, Zod

---

## 🚀 Funcionalidades

### ✅ Etapa 1
- Cadastro de sugestões de solução com código de erro (6 dígitos) e texto.
- Listagem e filtro de sugestões por código de erro.

### ✅ Etapa 2
- Cadastro de avaliações por código de erro, cliente, data e nota.
- Dashboard com média geral e por sugestão.

### ✅ Etapa 3
- Filtro de avaliações por data no dashboard.
- Detalhamento com cliente, comentário, nota e data.

### 🔄 Etapa 4 *(planejada)*
- Atualização em tempo real.
- Design responsivo.

---

## 🧠 Tecnologias utilizadas

### Backend
- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

### Frontend
- [React (Vite)](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)

---

## 📦 Estrutura de Pastas

### Backend

```
backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── suggestions/
│   │   ├── suggestions.module.ts
│   │   ├── suggestions.controller.ts
│   │   ├── suggestions.service.ts
│   │   └── dto/
│   ├── evaluations/
│   │   ├── evaluations.module.ts
│   │   ├── evaluations.controller.ts
│   │   ├── evaluations.service.ts
│   │   └── dto/
│   └── prisma/
│       ├── prisma.module.ts
│       └── prisma.service.ts
├── prisma/
│   └── schema.prisma
└── .env
```

### Frontend

```
frontend/
├── src/
│   ├── pages/
│   │   ├── dashboard-page.tsx
│   │   └── suggestions-page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── shared/
│   ├── lib/
│   │   ├── api.ts
│   │   └── utils.ts
├── tailwind.config.ts
├── shadcn.config.ts
└── .env
```

---

## 🧪 Como rodar localmente

### Requisitos
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [PNPM](https://pnpm.io/) ou `npm`/`yarn`

---

### Backend

```bash
# Acesse o backend
cd backend

# Copie e configure as variáveis
cp .env.example .env

# Suba o banco de dados
docker-compose up -d

# Instale as dependências
npm install

# Gere as migrations e o client Prisma
npx prisma migrate dev --name init

# Rode a API
npm run start:dev
```

📌 A API estará disponível em: `http://localhost:3000`  
📄 Documentação Swagger: `http://localhost:3000/api`

---

### Frontend

```bash
# Acesse o frontend
cd frontend

# Copie e configure o .env
cp .env.example .env

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

🌐 Frontend: `http://localhost:5173`

---

## 🔐 Variáveis de Ambiente

### Backend `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/efix"
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:3000
```

---

## 📫 Contato

Repositório mantido por **Victor Borges** para o processo seletivo.  
Compartilhado com a usuária **PatriciaSendon** no GitHub.

---
