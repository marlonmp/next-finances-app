import prisma from '@/lib/prisma';
import withErrorHandler from '@/lib/error.handler';
import { getFilters, getOrdering, getPagination } from '@/lib/filters';

import { transactionCreateValidator, transactionFilterValidator } from './validators';
import { transactionMapper } from './mappers';

export const GET = withErrorHandler(async function (req) {
  const pagination = getPagination(req);
  const filters = await getFilters(req, transactionFilterValidator);
  const ordering = getOrdering(req, ['date']);

  const count = await prisma.transaction.count(filters);

  const transactions = await prisma.transaction.findMany({
    ...pagination, ...ordering, ...filters,
    include: { tags: { include: { tag: true } } },
  });

  const data = transactions.map(transactionMapper);

  return Response.json({ count, data });
});

export const POST = withErrorHandler(async function (req) {
  const jsonData = await req.json();

  const { tags, ...validatedData } = await transactionCreateValidator.parseAsync(jsonData);

  const prismaTransaction = async tx => {
    const transaction = await tx.transaction.create({
      data: validatedData,
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

  const data = transactionMapper({ ...transaction, tags,  });

  return Response.json({ data }, {status:201});
});
