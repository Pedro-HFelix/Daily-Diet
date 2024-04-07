import { FastifyReply, FastifyRequest } from "fastify";

export async function checkReferenceUserIdExists(request: FastifyRequest, reply: FastifyReply) {
     const { user_reference_id } = request.cookies;
     
     if(!user_reference_id) {
          return reply.status(401).send({
               error: 'Unauthorized'
          });
     }
}