import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

import * as status from '@/lib/http.status';

const errorClientTypes = {
  parseError:      'parse_error',
  invalidData:     'invalid_data',
  uniqueViolation: 'unique_violation',
  noEntityFound:   'no_entity_found',
};

export default function withErrorHandler(handler) {
  return async function (req, ...args) {
    try {
      return await handler(req, ...args);
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);

      if (error instanceof SyntaxError) {
        return Response.json({
          data: { type: errorClientTypes.parseError, message: 'invalid JSON' },
        }, { status: status.HTTP_STATUS_BAD_REQUEST });
      }

      if (error instanceof ZodError) {
        const flatten = error.flatten();
        return Response.json({
          type: errorClientTypes.invalidData,
          data: flatten?.formErrors?.length ? flatten?.formErrors : flatten.fieldErrors,
        }, { status: status.HTTP_STATUS_BAD_REQUEST });
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // if unique constraint
        if (error.code === 'P2002') {
          const message = `A "${error.meta?.modelName}" with this "${error.meta?.target.join(', ')}" already exists`;
          return Response.json({
            type: errorClientTypes.uniqueViolation,
            data: { message },
          }, { status: status.HTTP_STATUS_CONFLICT });
        }
        // if not found error is throwed
        if (error.code === 'P2025') {
          return Response.json({
            type: errorClientTypes.noEntityFound,
            data: { message: error.message },
          }, { status: status.HTTP_STATUS_NOT_FOUND });
        }
      }

      return Response.json({ data: { message: 'internal server error' } }, { status: 500 });
    }
  };
}
