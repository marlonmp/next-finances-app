import prisma from '@/lib/prisma';
import withErrorHandler from '@/lib/error.handler';

import { transactionCreateValidator, transactionFilterValidator } from './validators';
import { getFilters, getOrdering, getPagination } from '@/lib/filters';

export const GET = withErrorHandler(async function (req) {
  const pagination = getPagination(req);
  const filters = await getFilters(req, transactionFilterValidator);
  const ordering = getOrdering(req, ['date']);

  const transactions = await prisma.transaction.findMany({
    ...pagination, ...ordering, ...filters,
    include: {
      tags: {
        include: {
          tag: { select: { id: true, name: true } }
        }
      }
    }
  });

  return Response.json({
    count: await prisma.transaction.count(filters),
    data: [...transactions.map(transaction => ({
      ...transaction,
      tags: [...transaction.tags.map(tag => ({ id: tag.tag_id, name: tag.tag.name, added_at: tag.added_at }))]
    }))],
  });
});

export const POST = withErrorHandler(async function (req) {
  const jsonData = await req.json();

  const data = await transactionCreateValidator.parseAsync(jsonData);

  const transaction = await prisma.transaction.create({ data });

  return Response.json({data: transaction}, {status:201});
});
