import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";
import { checkReferenceUserIdExists } from "../middlewares/checkReferenceUserIdExists";


export async function usersRoutes(app: FastifyInstance){
     app.post('/', async (request, reply) => {
          const createUserSchema = z.object({
               name: z.string()          
          });

          const { name } = createUserSchema.parse(request.body);
          const userUUID = randomUUID();

          reply.setCookie('user_reference_id', userUUID, {
               path: '/',
               maxAge: 60 * 60 * 24 * 7 // 7 days
          });

          await knex('users').insert({
               id: randomUUID(),
               name: name,
               user_reference_id: userUUID
          });

          return reply.status(201).send();
     });    

     app.get('/metrics', {preHandler: checkReferenceUserIdExists}, async (request, reply) => {
          const { user_reference_id } = request.cookies;

          const { totalMealsRegistered } = await knex('meals')
               .count('id', {as: 'totalMealsRegistered'})
               .where({user_reference_id}) 
               .first() ?? { totalMealsRegistered: 0 };

          const { mealsInDiet } = await knex('meals')
               .count('id', {as: 'mealsInDiet'})                                      
               .where({user_reference_id, is_in_diet: true})
               .first() ?? { mealsInDiet: 0 };

        const { mealsOutOfDiet } = await knex('meals')
          .count('id', {as: 'mealsOutOfDiet'})
          .where({user_reference_id, is_in_diet: false})
          .first() ?? { mealsOutOfDiet: 0 };

        const getAllMealsOfUser = await knex('meals')
          .where({ user_reference_id})
          .orderBy('date_time_meal', 'desc')

        const { bestDietSequence } = getAllMealsOfUser.reduce((reduceVariable, meal) => {
             if (meal.is_in_diet) {
                  reduceVariable.currentSequence += 1
             } else {
                  reduceVariable.currentSequence = 0
             }

             if (reduceVariable.currentSequence > reduceVariable.bestDietSequence) {
                  reduceVariable.bestDietSequence = reduceVariable.currentSequence
             }

             return reduceVariable
          },{ bestDietSequence: 0, currentSequence: 0 });

        return{
          totalMealsRegistered,
          mealsInDiet,
          mealsOutOfDiet,
          bestDietSequence
        }
   });
}