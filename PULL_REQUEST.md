# Task Manager - README

## ✨ Visão Geral

Aplicativo completo de gerenciamento de tarefas, com funcionalidades de login, filtros, favoritos, testes automatizados, responsividade e CI/CD.

Frontend com **React + TypeScript**, backend com **Node.js + Express + MongoDB**, e pipeline de **integração contínua com GitHub Actions**.

---

## 🎓 Tecnologias Utilizadas

### Frontend

* React
* TypeScriptTask Manager - README

  ## ✨ Visão Geral

  Aplicativo completo de gerenciamento de tarefas, com funcionalidades de login, filtros, favoritos, testes automatizados, responsividade e CI/CD.

  ## Frontend com **React + TypeScript**, backend com **Node.js + Express + MongoDB**, e pipeline de **integração contínua com GitHub Actions**.

  ## 🎓 Tecnologias Utilizadas

  ### Frontend

  * React
* Mongoose
* Joi (validação)
* Jest + Supertest
* mongodb-memory-server (testes isolados)

### DevOps

* GitHub Actions (CI/CD)
* Cross-env
* ESLint + Prettier

---

## 📁 Estrutura de Pastas

```
frontend/
├── components/
├── pages/
├── store/
├── styles/
├── types/

backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   └── server.js
├── tests/
│   ├── tasks.test.js
│   └── setup.js
├── .env
└── package.json
```

---

## 📅 Funcionalidades

### Login

* Autenticação via e-mail
* Armazenamento com `localStorage`
* Modal com responsividade

### Tarefas

* Criação e edição inline (título e descrição)
* Cor personalizável com `ColorPicker`
* Favoritar/desfavoritar
* Exclusão

### Filtros

* Filtro por favoritos
* Filtro por cor
* Busca textual combinada com filtros

### UI & Responsividade

* Layout adaptado para mobile/tablet
* Componentes responsivos com SCSS modular
* Interações suaves com transições CSS

### Testes

* Backend: Jest + Supertest + MongoDB em memória
* Frontend: React Testing Library
* Validação de erros, autenticação, CRUD

### CI/CD

* Pipeline GitHub Actions:

  * Instala dependências
  * Executa testes frontend/backend
  * Valida merge com branch `main`

---

## ⚙️ Como Executar Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/avelar-machado/corelab-web-challenge.git
cd corelab-web-challenge
```

### 2. Instalar dependências do backend

```bash
cd backend
npm install
```

### 3. Configurar variáveis de ambiente `.env`

```env
MONGO_URI=mongodb+srv://velarmachado0:ldXH3ucTtRgWBNFf@cluster0.mongodb.net/task-manager?retryWrites=true&w=majority
PORT=5000
```

### 4. Rodar o backend

```bash
npm run dev
```

### 5. Instalar dependências do frontend

```bash
cd ../frontend
npm install
```

### 6. Rodar o frontend

```bash
npm run dev
```

### 7. Rodar os testes

```bash
# Backend
dcd backend
npm test

# Frontend
cd ../frontend
npm test
```

---

## 📆 Pipeline CI/CD

Arquivo `.github/workflows/ci.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Instalar dependências frontend
        run: npm install
        working-directory: ./frontend
      - name: Testes backend
        run: npm test
        working-directory: ./backend
      - name: Testes frontend
        run: npm test
        working-directory: ./frontend
```

---

## 📄 Considerações Finais

Sistema modular, responsivo e testado, com deploy automatizado.
