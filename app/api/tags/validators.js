import { z } from 'zod';

import prisma from '@/lib/prisma';
import { clearString } from '@/lib/utils';

export const tagIdValidator = z.string()
  .uuid()
  .transform(async id => await prisma.tag.findUniqueOrThrow({ where: { id } }));

const name = z.string()
  .max(32)
  .trim()
  .transform(val => val.replace(/\ {1,}/g, '_'))
  .transform(val => clearString(val))
  .transform(val => val.toLowerCase());

export const tagFilterValidator = z.object({ name__sh: name });

export const tagCreateValidator = z.object({ name });

export const tagUpdateValidator = z.object({ name });
