import { beforeAll, afterAll, describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

// TODO TESTE, OBRIGATORIAMENTE DEVE SE EXCLUIR DE QUALQUER CONTEXTO, NAO PASSA INFOS DE UM TESTE PARA O OUTRO - É REGRA, UM TESTE NAO PODE DEPENDER DE OUTRO

describe('Transactions routes', () => {
  // antes de todos os testes
  beforeAll(async () => {
    await app.ready()
  })

  // depois de todos os teste
  afterAll(async () => {
    app.close()
  })

  // antes de cada teste
  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all') // desfazer todas as migrations para mantes o DB zerado para teste -- cenario ideal é sempre estar zerado o DB
    execSync('npm run knex migrate:latest') // dentro de (' ') é comando para executar a migration, execSync serve para executar comandos paralelos no meio da aplicação
  })

  // test e it fazem a mesma coisa, it complementa o nome do teste e tem as opços de pular, executar somente e lembrar de fazer dps o teste
  // para pular o test em it, o comando é it.skip() para lembrar de fazer dps it.todo(), para rodar somente um test it.only() - esse ignora todos os outros
  it('create a new transatcion', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    // como nao posso depender do test de criação da transação, preciso criar a transação aqui pra poder listar
    const createTransactionsResponse = await request(app.server).post('/transactions').send({
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    })

    const cookies = createTransactionsResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      // formas de listar quando nao se sabe todas as infos

      // forma1
      // {
      //   id: expect.any(String), // campos que desconheço, nesse caso o id é randomico e não criado pelo user
      // },

      // forma 2
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    // como nao posso depender do test de criação da transação, preciso criar a transação aqui pra poder listar
    const createTransactionsResponse = await request(app.server).post('/transactions').send({
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    })

    const cookies = createTransactionsResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionsResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionsResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    )
  })

  it('should be able to to get the summary', async () => {
    // como nao posso depender do test de criação da transação, preciso criar a transação aqui pra poder listar
    const createTransactionsResponse = await request(app.server).post('/transactions').send({
      title: 'credit transaction',
      amount: 5000,
      type: 'credit',
    })

    const cookies = createTransactionsResponse.get('Set-Cookie')

    await request(app.server).post('/transactions').set('Cookie', cookies).send({
      title: 'debit transaction',
      amount: 2000,
      type: 'debit',
    })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})
