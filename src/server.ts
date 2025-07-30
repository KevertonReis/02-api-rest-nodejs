import fastify from 'fastify';
import { knex } from './database';
import crypto from 'node:crypto';
import { env } from './env';

// GET, POST, PUT, PATCH e DELETE
// Comando para limpar e padronizar o codigo de acordo com o ESLint-> npm run lint
// PARA RODAR O SERVER EM JS SEM CONVERTER/CRIAR ARQUIVO, EXECUTAR O COMANDO "NPX TSX ARQUIVO.EXTENSAO" -- RECOMENDADO PARA USAR EM DESENVOLVIMENTO, NAO RECOMENDADO PARA PRODUÇÃO
// EcmaScript Lint = ES Lint

const app = fastify();

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),

      title: 'Transaction test',

      amount: 1000,
    })

    .returning('*');

  return transaction;
});

app

  .listen({
    port: env.PORT,
  })

  .then(() => {
    console.log('HTTP SERVER RUNNING AT PORT 3333');
  });
