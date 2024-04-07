import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
     await knex.schema.createTable('meals', (table) => {
          table.uuid('id').primary(),
          table.uuid('user_reference_id').references('user_reference_id').inTable('users').notNullable(),
          table.text('name').notNullable,
          table.text('description').notNullable,
          table.dateTime('date_time_meal').notNullable,
          table.boolean('is_in_diet').notNullable,
          table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
          table.timestamp('updated_at')
     })
}


export async function down(knex: Knex): Promise<void> {
     await knex.schema.dropTable('meals')
}
