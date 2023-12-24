import { accounttype } from '@prisma/client';
import prisma from '@/lib/prisma';

import { z } from 'zod';


const name = z.string().trim().max(32);

const type = z.enum(Object.values(accounttype));

export const accountFilterValidator = z.object({
  type__in: z.string()
    .transform((types) => types.split(','))
    .pipe(type.array()),
});

export const accountCreateValidator = z.object({
  name,
  type,
});

export const accountUpdateValidator = z.object({
  name,
  type,
});
