import 'dotenv/config'
import { z } from 'zod'

// node_env é enviado pelas ferramentas utilizadas na aplicação
// enum é uma entre algumas opções

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number(), // força conversão de string para número
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'), // configurando o ambiente
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ invalid environment variables!', _env.error.format())

  throw new Error('⚠️ invalid environment variables!')
}

export const env = _env.data
