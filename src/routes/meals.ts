import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";
import { checkReferenceUserIdExists } from "../middlewares/checkReferenceUserIdExists";

export async function mealsRoutes(app: FastifyInstance) {
     app.addHook('preHandler', async (request, reply) => {
          await checkReferenceUserIdExists(request, reply);
     });

     //create meal
     app.post('/', async (request, reply) => {
          const createMealSchema = z.object({
               name: z.string(),
               description: z.string(),
               date_time_meal: z.string(),
               is_in_diet: z.boolean(),
          });

          const { 
               name, 
               date_time_meal, 
               description, 
               is_in_diet, 
          } = createMealSchema.parse(request.body);

          const { user_reference_id } = request.cookies;

          await knex('meals').insert({
               id: randomUUID(),
               user_reference_id,
               name,
               description,
               date_time_meal,
               is_in_diet,
          });

          return reply.status(201).send();
     });

     // get all meals
     app.get('/', async (request, reply) => {
          const { user_reference_id } = request.cookies;

          const meals = await knex('meals')
               .select('id', 'name', 'description', 'date_time_meal', 'is_in_diet')
               .where({user_reference_id});

          return {meals}
     });

     // get meal by id
     app.get('/:id', async (request, reply) => {
          const { user_reference_id } = request.cookies;
          
          const getTransactionParamsSchema = z.object({
               id: z.string().uuid(),
          });

          const { id } = getTransactionParamsSchema.parse(request.params);

          const meal = await knex('meals')
               .select('id', 'name', 'description', 'date_time_meal', 'is_in_diet')
               .where({user_reference_id, id})
               .first();


          return {
               meal
          };
     });

     // update meal by id
     app.put('/:id', async (request, reply) => {
          const { user_reference_id } = request.cookies;

          const updateMealSchema = z.object({
               name: z.string().nullable(),
               description: z.string().nullable(),
               date_time_meal: z.string().nullable(),
               is_in_diet: z.boolean().nullable(),
          });

          const { 
               name, 
               date_time_meal, 
               description, 
               is_in_diet, 
          } = updateMealSchema.parse(request.body);

          const updateTransactionParamsSchema = z.object({
               id: z.string().uuid(),
          });

          const { id } = updateTransactionParamsSchema.parse(request.params);

          const meal = await knex('meals')
               .select('name', 'description', 'date_time_meal', 'is_in_diet')
               .where({ user_reference_id, id })
               .first();

          await knex('meals')
               .update({
                    name: name ?? meal?.name,
                    description: description ?? meal?.description,
                    date_time_meal: date_time_meal ?? meal?.date_time_meal,
                    is_in_diet: is_in_diet ?? meal?.is_in_diet,
                    updated_at: knex.fn.now(),
               })
               .where({ user_reference_id, id });

          return reply.status(204).send();
     });

     // delete meal by id
     app.delete('/:id', async (request, reply) => {
          const { user_reference_id } = request.cookies;

          const deleteTransactionParamsSchema = z.object({
               id: z.string().uuid(),
          });

          const { id } = deleteTransactionParamsSchema.parse(request.params);

          await knex('meals')
          .delete()
          .where({user_reference_id, id});

          return reply.status(204).send();
     });
}