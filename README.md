## Fábrica de Software II

### API para de suporte para o projeto Workout-app.
A API manipula os dados obtidos a partir do App Workout-app.
O projeto workout-app busca digitalizar o processo de gerenciamento em academias.
Sendo desenvolvido pela equipe do segundo período de Fábrica de Software II.

### Funcionamento da API.

* #### Instruções:
* * Baixar ou Clonar o repositório;
* * Subir para um serviço na nuvem ou localmente;
* * Renomer o arquivo .env.example para .env;
* * Criar um banco de dados, apenas nomeando-o, pois as tabelas são criadas automaticamente pelo framework Typeorm para Postgres;
* * Preencher o arquivo .env com as credenciais da máquina e do banco de dados que será utilizado pela à API.
* * * POSTGRES_USER=postgres
* * * POSTGRES_DATABASE=postgres
* #### Comandos:
* * docker-compose up -d
* * * comando para criar, e iniciá-los no docker.
* * npm run seed
* * * * comando para inserir dodos padrões para o app.
### :computer: Tecnologias utilizadas:
<br/>
<code><img width="10%" src="https://www.vectorlogo.zone/logos/nestjs/nestjs-ar21.svg">&nbsp;&nbsp;<img width="10%" src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-ar21.svg">&nbsp;&nbsp;<img width="10%" src="https://www.vectorlogo.zone/logos/postgresql/postgresql-ar21.svg"></code>
<br/>
<br/>
<code><img width="10%" src="https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-ar21.svg">&nbsp;&nbsp;<img width="10%" src="https://www.vectorlogo.zone/logos/docker/docker-ar21.svg">&nbsp;&nbsp;<img width="10%" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg">&nbsp;&nbsp;<img width="10%" src="https://www.vectorlogo.zone/logos/json/json-ar21.svg"></code>
<br/>
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm start dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
