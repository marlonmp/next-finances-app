import prisma from '@/lib/prisma';
import withErrorHandler from '@/lib/error.handler';

import { tagCreateValidator, tagFilterValidator } from './validators';
import { getFilters, getOrdering, getPagination } from '@/lib/filters';

export const GET = withErrorHandler(async function (req) {
  const pagination = getPagination(req);
  const filters = await getFilters(req, tagFilterValidator);
  const ordering = getOrdering(req, ['created_at', 'updated_at']);

  const tags = await prisma.tag.findMany({ ...pagination, ...ordering, ...filters });

  return Response.json({
    count: await prisma.tag.count(filters),
    data: [...tags]
  });
});

export const POST = withErrorHandler(async function (req) {
  const jsonData = await req.json();

  const data = await tagCreateValidator.parseAsync(jsonData);

  const tag = await prisma.tag.create({ data });

  return Response.json({data: tag}, {status:201});
});
