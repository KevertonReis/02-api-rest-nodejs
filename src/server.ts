import { app } from './app'
import { env } from './env'

app

  .listen({
    port: env.PORT,
  })

  .then(() => {
    console.log('HTTP SERVER RUNNING')
  })
// npm list

//   02-api-rest-nodejs@1.0.0 C:\ProjectNode\02-api-rest-nodejs
// ├── @fastify/cookie@11.0.2
// ├── @rocketseat/eslint-config@2.2.2
// ├── @types/knex@0.15.2
// ├── @types/node@24.0.15
// ├── @types/supertest@6.0.3
// ├── dotenv@17.2.1
// ├── eslint-plugin-prettier@5.5.3
// ├── eslint@8.57.1
// ├── fastify@5.4.0
// ├── knex@3.1.0
// ├── prettier@3.6.2
// ├── sqlite3@5.1.7
// ├── supertest@7.1.4
// ├── ts-node@10.9.2
// ├── tsx@4.20.3
// ├── typescript@5.9.2
// ├── vitest@3.2.4
// └── zod@4.0.13
