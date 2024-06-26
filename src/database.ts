import { env } from './env'
import { Knex, knex as setupKnex } from 'knex'
import 'dotenv/config'

export const config: Knex.Config = {
     client: 'sqlite3',
     connection: {
       filename: './db/app.db',
     },
     useNullAsDefault: true,
     migrations: {
          extension: 'ts',
          directory: './db/migrations',
     },
}
export const knex = setupKnex(config)