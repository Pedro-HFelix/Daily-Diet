import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
     await knex.schema.createTable('users', (table) => {
          table.uuid('id').primary().notNullable(),
          table.text('name').notNullable,
          table.uuid('user_reference_id').notNullable()
          table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
     });
}


export async function down(knex: Knex): Promise<void> {
     await knex.schema.dropTable('users')
}

