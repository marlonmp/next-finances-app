import prisma from '@/lib/prisma';
import withErrorHandler from '@/lib/error.handler';

import { accountIdValidator, accountUpdateValidator } from '../validators';


export const GET = withErrorHandler(async function (req, { params }) {
  const account = await accountIdValidator.parseAsync(params.id);

  const { _sum: { amount: expenses } } = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { account_id: account.id, type: 'expense' }
  });

  const { _sum: { amount: incomes } } = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { account_id: account.id, type: 'income' }
  });

  const balance = (incomes || 0) - (expenses || 0);

  return Response.json({data: {...account, balance}}, {status: 200});
});


/**
 * Returns the update handler with partial validations if is needed.
 * @param {Boolean} partial
 */
function updateHandler(partial) {
  return withErrorHandler(async function (req, { params }) {
    const account = await accountIdValidator.parseAsync(params.id);

    const jsonData = await req.json();

    const validator = partial ? accountUpdateValidator.partial() : accountUpdateValidator;

    const data = await validator.parseAsync(jsonData);

    const updatedAccount = await prisma.account.update({ data, where: { id: account.id } });

    return Response.json({data: updatedAccount}, {status: 200});
  });
}


export const PUT = updateHandler(false);


export const PATCH = updateHandler(true);


export const DELETE = withErrorHandler(async function (req, { params }) {
  const account = await accountIdValidator.parseAsync(params.id);

  const deletedAccount = await prisma.account.delete({ where: { id: account.id } });

  return Response.json({data: deletedAccount}, {status: 202});
});
