import type { Knex } from 'knex';

// subir alterações na tabela
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary();
    table.text('title').notNullable();
  });
}

// basicamente é o desfazer, retorna a alteração para o valor padrao
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions');
}
