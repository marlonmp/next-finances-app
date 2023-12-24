import { ZodError } from 'zod';

export default function withErrorHandler(handler) {
  return async function (req, ...args) {
    try {
      return await handler(req, ...args);
    } catch (error) {
      console.log({location: handler.name, body: req, error});

      if (error instanceof SyntaxError) {
        return Response.json({data: {message: 'invalid JSON'}}, {status: 400});
      }

      if (error instanceof ZodError) {
        return Response.json({
          data: error.flatten()?.fieldErrors ?? [],
        }, {status: 400});
      }

      return Response.json({data: {message: 'internal server error'}}, {status: 500});
    }
  };
}
