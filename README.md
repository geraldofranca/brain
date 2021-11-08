## Descrição

Teste Brain

## Instalação

```bash
$ npm install
```

## Docker
Executar o seguinte comando

```bash
$ docker-compose up -d
```

## Acesso ao banco
Quando subir o docker já terá acesso ao banco de dados pelo Adminer. Os dados para acesso são:

- http://localhost:8080
  - Sistema: PostgreSQL
  - Servidor: pgsql
  - Usuário: pguser
  - Senha: pgpassword

## Executar a aplicação

```bash
$ npm run start
```

- Endereço da API: http://localhost:3000

## Documentação (Em desenvolvimento)
A documentação da API está disponível via Swagger no endereço http://localhost:3000/api/docs/

## Executar os testes

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
