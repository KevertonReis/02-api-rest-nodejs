import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import crypto, { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  // não precisa definir o nome que ja esta definido em app.register no server.ts

  // rota para criar as transações
  app.post('/', async (req, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(req.body) // nada abaixo desse codigo sera executado sem essa validação

    // insere o id quando o usuario esta logado
    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1, // se type for igual a credit ele vai ser o valor de amount, se for debit sera amount *-1
      session_id: sessionId,
    })

    return reply.status(201).send()
  })

  // rota para listar todas as transações
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const { sessionId } = req.cookies

      const transactions = await knex('transactions').where('session_id', sessionId).select()

      // retornar como objeto
      return {
        transactions,
      }
    },
  )

  // rota para o resumo das transações - summary
  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const { sessionId } = req.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()
      return { summary }
    },
  )

  // rota para listar a transação por id
  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      // utilizado pq o req.params nao identifica sozinho
      const getTransactionsParamsSchema = z.object({
        id: z.uuid(),
      })

      const { sessionId } = req.cookies

      const { id } = getTransactionsParamsSchema.parse(req.params)

      const transaction = await knex('transactions')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      return { transaction }
    },
  )
}
