# Backend Node.js - Users API

Este projeto é uma API construída com Node.js e Prisma que se conecta a um banco de dados MongoDB. A API permite realizar operações CRUD (Criar, Ler, Atualizar, Deletar) em uma coleção de usuários.

Instale as dependências:

```bash
  npm install
```
Crie um arquivo .env na raiz do projeto com a seguinte variável de ambiente:
```plaintext
DATABASE_URL="mongodb+srv://pabloasdev:senha@users.9mdjb.mongodb.net/Users?retryWrites=true&w=majority&appName=users"
```
OBS: Substitua senha pela senha correta do seu banco de dados MongoDB.

Configure o Prisma executando o seguinte comando:

```bash
npx prisma generate
```

Para iniciar o servidor, execute:
```bash
npm start
```

# Frontend Angular - Users App

Instale as dependências:

```bash
  npm install
```

Configuração de Ambiente
Caso você tenha variáveis de ambiente específicas para a URL da API ou outras configurações, crie o arquivo src/environments/environment.ts e configure o baseUrl da API. Exemplo:

```plaintext
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000' 
};
```
