import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export default function withErrorHandler(handler) {
  return async function (req, ...args) {
    try {
      return await handler(req, ...args);
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);

      if (error instanceof SyntaxError) {
        return Response.json({data: {message: 'invalid JSON'}}, {status: 400});
      }

      if (error instanceof ZodError) {
        const flatten = error.flatten();
        return Response.json({
          data: flatten?.formErrors?.length ? flatten?.formErrors : flatten.fieldErrors,
        }, {status: 400});
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // if not found error is throwed
        if (error.code === 'P2025') {
          return Response.json({data: {message: error.message}}, {status: 404});
        }
      }

      return Response.json({data: {message: 'internal server error'}}, {status: 500});
    }
  };
}
