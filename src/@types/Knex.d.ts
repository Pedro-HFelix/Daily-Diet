import { Knex } from 'knex'

declare module 'knex/types/tables' {
     export interface Tables {
          users: {
               id: string
               name: string
               user_reference_id: string
               created_at: string
          },
          meals: {
               id: string
               user_reference_id: string
               name: string
               description: string
               date_time_meal: string
               is_in_diet: boolean
               created_at: string
               updated_at?: string
          }
     }
}