import { z } from 'zod';

import prisma from '@/lib/prisma';
import * as status from '@/lib/http.status';
import withErrorHandler from '@/lib/error.handler';

import { transactionMapper } from '../mappers';
import { transactionIdValidator, transactionUpdateValidator } from '../validators';


export const GET = withErrorHandler(async function (req, { params }) {
  const id = z.string().uuid().parse(params.id);

  const transaction = await prisma.transaction.findUniqueOrThrow({
    where: { id },
    include: { tags: { include: { tag: true } } },
  });

  const data = transactionMapper(transaction);

  return Response.json({ data }, { status: status.HTTP_STATUS_OK });
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

    const { tags, ...validatedData } = await validator.parseAsync(jsonData);

    const prismaTransaction = async tx => {
      if (tags) {
        await tx.transaction_tag.createMany({
          data: [
            ...tags.map(tag => ({ transaction_id: transaction.id, tag_id: tag.id })),
          ],
          skipDuplicates: true,
        });

        await tx.transaction_tag.deleteMany({
          where: {
            transaction_id: validatedData.id,
            NOT: {
              tag_id: { in: [...tags.map(tag => tag.id)] },
            }
          }
        });
      }

      return await tx.transaction.update({
        data: validatedData,
        where: { id: transaction.id },
        include: { tags: { include: { tag: true } } },
      });
    };

    const updatedTransaction = await prisma.$transaction(prismaTransaction);

    const data = transactionMapper(updatedTransaction);

    return Response.json({ data }, { status: status.HTTP_STATUS_OK });
  });
}


export const PUT = updateHandler(false);


export const PATCH = updateHandler(true);


export const DELETE = withErrorHandler(async function (req, { params }) {
  const transaction = await transactionIdValidator.parseAsync(params.id);

  const deletedTransaction = await prisma.transaction.delete({
    where: { id: transaction.id },
    include: { tags: { include: { tag: true } } },
  });

  const data = transactionMapper(deletedTransaction);

  return Response.json({ data }, { status: status.HTTP_STATUS_ACCEPTED });
});
