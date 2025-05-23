# eFix Web (Frontend)

Interface Web desenvolvida em React para o sistema eFix, responsável por gerenciar sugestões de solução para erros de comunicação com serviços do governo (como eSocial e Reinf), conforme projeto de processo seletivo.

## 🚀 Tecnologias utilizadas

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/) — (ou CRA, se preferir)
* [Tailwind CSS](https://tailwindcss.com/)
* [Axios](https://axios-http.com/)
* [React Router](https://reactrouter.com/)
* [React Hook Form](https://react-hook-form.com/)

## 📖 Estrutura do projeto

```
src/
├── assets/
├── components/
│   ├── Header.tsx
│   └── ...
├── pages/
│   ├── Dashboard.tsx
│   ├── SuggestionForm.tsx
│   └── EvaluationForm.tsx
├── services/
│   └── api.ts
├── types/
├── hooks/
├── App.tsx
└── main.tsx
```

## 📁 Como rodar localmente

### Requisitos:

* Node.js (versão 18 ou superior)
* Yarn ou npm

### Passos:

```bash
# Clonar o repositório
git clone https://github.com/victorborges97/efix.git
cd efix/frontend

# Instalar dependências
npm install

# Iniciar o projeto
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou porta configurada pelo Vite)

## 📂 Variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example`:

```env
VITE_API_URL=http://localhost:3000
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

## 🔗 Backend

Repositório: [efix-api](https://github.com/victorborges97/efix)

## 👥 Contato

Repositório mantido para o processo seletivo. Compartilhado com a usuária **PatriciaSendon** no GitHub.
