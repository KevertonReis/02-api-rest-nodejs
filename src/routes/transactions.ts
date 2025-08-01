import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import crypto from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  // não precisa definir o nome que ja esta definido em app.register no server.ts

  //rota para listar todas as transações
  app.get('/', async () => {
    const transactions = await knex('transactions').select()

    //retornar como objeto
    return {
      transactions,
    }
  })

  app.get('/:id', async (req) => {
    // utilizado pq o req.params nao identifica sozinho
    const getTransactionsParamsSchema = z.object({
      id: z.uuid(),
    })

    const { id } = getTransactionsParamsSchema.parse(req.params)

    const transaction = await knex('transactions').where('id', id).first()

    return {transaction}
  })

  //rota para criar as transações
  app.post('/', async (req, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(req.body) // nada abaixo desse codigo sera executado sem essa validação

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1, // se type for igual a credit ele vai ser o valor de amount, se for debit sera amount *-1
    })

    return reply.status(201).send()
  })
}
