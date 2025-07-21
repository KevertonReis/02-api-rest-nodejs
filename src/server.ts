import fastify from 'fastify'
import { knex } from './database'

// GET, POST, PUT, PATCH e DELETE

// Comando para limpar e padronizar o codigo de acordo com o ESLint-> npm run lint

const app = fastify()

app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})

// PARA RODAR O SERVER EM JS SEM CONVERTER/CRIAR ARQUIVO, EXECUTAR O COMANDO "NPX TSX ARQUIVO.EXTENSAO" -- RECOMENDADO PARA USAR EM DESENVOLVIMENTO, NAO RECOMENDADO PARA PRODUÇÃO

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP SERVER RUNNING AT PORT 3333')
  })

// EcmaScript Lint = ES Lint
