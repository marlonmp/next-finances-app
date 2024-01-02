import prisma from '@/lib/prisma';
import * as status from '@/lib/http.status';
import withErrorHandler from '@/lib/error.handler';
import { getFilters, getOrdering, getPagination } from '@/lib/filters';

import { accountCreateValidator, accountFilterValidator } from './validators';
import { accountMapper } from './mappers';

export const GET = withErrorHandler(async function (req) {
  const pagination = getPagination(req);
  const filters = await getFilters(req, accountFilterValidator);
  const ordering = getOrdering(req, ['created_at', 'updated_at']);

  const count = await prisma.account.count(filters);

  const include = { transactions: { select: { amount: true, type: true } } };

  const accounts = await prisma.account.findMany({ ...pagination, ...ordering, ...filters, include });

  const data = accounts.map(accountMapper);

  return Response.json({ count, data }, { status: status.HTTP_STATUS_OK });
});

export const POST = withErrorHandler(async function (req) {
  const jsonData = await req.json();

  const data = await accountCreateValidator.parseAsync(jsonData);

  const account = await prisma.account.create({ data });

  return Response.json({ data: account }, { status: status.HTTP_STATUS_CREATED });
});
