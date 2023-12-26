import { transactiontype } from '@prisma/client';
import prisma from '@/lib/prisma';

import { z } from 'zod';


export const transactionIdValidator = z.string()
  .uuid()
  .transform(async id => await prisma.transaction.findUniqueOrThrow({ where: { id }}));

const account = z.string()
  .uuid()
  .transform(async id => await prisma.account.findUnique({where: {id}}))
  .refine(account => !!account, { message: 'Not account found' });

const accountConnect = account.transform(account => ({ connect: { id: account.id } }));

const reference = z.string().trim().max(64);

const amount = z.coerce.number().gte(0).multipleOf(0.01);

const date = z.coerce.date();

const type = z.enum(Object.values(transactiontype));

const tags = z.string()
  .uuid()
  .transform(async id => await prisma.tag.findUnique({where: {id}}))
  .refine(account => !!account, { message: 'Not tag found' })
  .array();

const tagsConnect = tags
  .transform(tags => ({
    create: [...tags.map(tag => ({
      tag: { connect: { id: tag.id } }
    }))]
  }));


export const transactionFilterValidator = z.object({
  account_id: account.transform(account => account.id),
  account_id__in: z.string()
    .transform(ids => ids.split(','))
    .pipe(account.array())
    .transform(accounts => accounts.map(account => account.id)),
  amount,
  amount__range: z.string()
    .transform(ints => ints.split(','))
    .pipe(amount.array().length(2)),
  date,
  date__range: z.string()
    .transform(dates => dates.split(','))
    .pipe(date.array().length(2)),
  type,
  type__in: z.string()
    .transform(types => types.split(','))
    .pipe(type.array()),
  tags_id__in: tags,
});


export const transactionCreateValidator = z.object({
  account: accountConnect,
  reference,
  amount,
  date,
  type,
  tags: tagsConnect,
});


export const transactionUpdateValidator = z.object({
  reference,
  amount,
  date,
  type,
  tags: tagsConnect,
});
