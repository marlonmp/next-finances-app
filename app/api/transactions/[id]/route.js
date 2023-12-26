import prisma from '@/lib/prisma';
import withErrorHandler from '@/lib/error.handler';

import { transactionIdValidator, transactionUpdateValidator } from '../validators';


export const GET = withErrorHandler(async function (req, { params }) {
  const transaction = await transactionIdValidator.parseAsync(params.id);

  return Response.json({data: transaction}, {status: 200});
});


/**
 * Returns the update handler with partial validations if is needed.
 * @param {Boolean} partial
 */
function updateHandler(partial) {
  return withErrorHandler(async function (req, { params }) {
    const transaction = await transactionIdValidator.parseAsync(params.id);

    const jsonData = await req.json();

    const validator = partial ? transactionUpdateValidator.partial() : transactionUpdateValidator;

    const data = await validator.parseAsync(jsonData);

    const updatedTransaction = await prisma.transaction.update({ data, where: { id: transaction.id } });

    return Response.json({data: updatedTransaction}, {status: 200});
  });
}


export const PUT = updateHandler(false);


export const PATCH = updateHandler(true);


export const DELETE = withErrorHandler(async function (req, { params }) {
  const transaction = await transactionIdValidator.parseAsync(params.id);

  const deletedTransaction = await prisma.transaction.delete({ where: { id: transaction.id } });

  return Response.json({data: deletedTransaction}, {status: 202});
});
