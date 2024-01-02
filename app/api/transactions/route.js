import prisma from '@/lib/prisma';
import * as status from '@/lib/http.status';
import withErrorHandler from '@/lib/error.handler';
import { getFilters, getOrdering, getPagination } from '@/lib/filters';

import { transactionMapper } from './mappers';
import { transactionCreateValidator, transactionFilterValidator } from './validators';

export const GET = withErrorHandler(async function (req) {
  const pagination = getPagination(req);
  const filters = await getFilters(req, transactionFilterValidator);
  const ordering = getOrdering(req, ['date']);

  const count = await prisma.transaction.count(filters);

  const transactions = await prisma.transaction.findMany({
    ...pagination, ...ordering, ...filters,
    include: { tags: { include: { tag: true } }, account: { select: { id: true, name: true } } },
  });

  const data = transactions.map(transactionMapper);

  return Response.json({ count, data }, { status: status.HTTP_STATUS_OK });
});

export const POST = withErrorHandler(async function (req) {
  const jsonData = await req.json();

  const { tags, ...validatedData } = await transactionCreateValidator.parseAsync(jsonData);

  const prismaTransaction = async tx => {
    const transaction = await tx.transaction.create({
      data:    validatedData,
      include: { tags: { include: { tag: true } } },
    });

    await tx.transaction_tag.createMany({
      data: [
        ...tags.map(tag => ({ transaction_id: transaction.id, tag_id: tag.id })),
      ],
      skipDuplicates: true,
    });

    return transaction;
  };

  const transaction = await prisma.$transaction(prismaTransaction);

  const data = transactionMapper({ ...transaction, tags });

  return Response.json({ data }, { status: status.HTTP_STATUS_CREATED });
});
