import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

// GET, POST, PUT, PATCH e DELETE
// Comando para limpar e padronizar o codigo de acordo com o ESLint-> npm run lint
// PARA RODAR O SERVER EM JS SEM CONVERTER/CRIAR ARQUIVO, EXECUTAR O COMANDO "NPX TSX ARQUIVO.EXTENSAO" -- RECOMENDADO PARA USAR EM DESENVOLVIMENTO, NAO RECOMENDADO PARA PRODUÇÃO
// EcmaScript Lint = ES Lint

const app = fastify()

app.register(cookie)

// passa configurações
app.register(transactionsRoutes, {
  prefix: 'transactions', // prefixo da url para que o plugin seja ativado, todas as rotas que sejam /transactions passa por esse plugin
})

app

  .listen({
    port: env.PORT,
  })

  .then(() => {
    console.log('HTTP SERVER RUNNING')
  })
