import prisma from '@/lib/prisma';
import withErrorHandler from '@/lib/error.handler';

import { accountCreateValidator, accountFilterValidator } from './validators';
import { getFilters, getOrdering, getPagination } from '@/lib/filters';

export const GET = withErrorHandler(async function (req) {
  const pagination = getPagination(req);
  const filters = await getFilters(req, accountFilterValidator);
  const ordering = getOrdering(req, ['created_at', 'updated_at']);

  const accounts = await prisma.account.findMany({ ...pagination, ...ordering, ...filters });

  return Response.json({
    count: await prisma.account.count(filters),
    data: [...accounts]
  });
});

export const POST = withErrorHandler(async function (req) {
  const jsonData = await req.json();

  const data = await accountCreateValidator.parseAsync(jsonData);

  const account = await prisma.account.create({ data });

  return Response.json({data: account}, {status:201});
});
