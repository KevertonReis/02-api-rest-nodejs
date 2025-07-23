import type { Knex } from 'knex';

// a partir do momento em que a migration é criada, ela nao pode ser editada

// subir alterações na tabela
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary();
    table.text('title').notNullable();
    table.decimal('amount').notNullable();
    table.timestamp('created at').defaultTo(knex.fn.now()).notNullable();
  });
}

// basicamente é o desfazer, retorna a alteração para o valor padrao
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions');
}
