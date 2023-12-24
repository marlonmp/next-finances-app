import { z } from 'zod';
import { clearString } from './utils';

export const paginationValidator = z.object({
  page: z.coerce.number().min(1).default(1),
  size: z.coerce.number().min(5).max(25).default(10),
});

export const orderingValidator = z.object({
  order: z.enum(['asc', 'desc']).default('asc'),
  order_by: z.string().max(32).transform((val) => clearString(val)),
});
