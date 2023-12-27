import prisma from '@/lib/prisma';
import * as status from '@/lib/http.status';
import withErrorHandler from '@/lib/error.handler';
import { getFilters, getOrdering, getPagination } from '@/lib/filters';

import { tagCreateValidator, tagFilterValidator } from './validators';

export const GET = withErrorHandler(async function (req) {
  const pagination = getPagination(req);
  const filters = await getFilters(req, tagFilterValidator);
  const ordering = getOrdering(req, ['created_at', 'updated_at']);

  const count = await prisma.tag.count(filters);

  const tags = await prisma.tag.findMany({ ...pagination, ...ordering, ...filters });

  return Response.json({ count, data: [...tags] }, { status: status.HTTP_STATUS_OK });
});

export const POST = withErrorHandler(async function (req) {
  const jsonData = await req.json();

  const data = await tagCreateValidator.parseAsync(jsonData);

  const tag = await prisma.tag.create({ data });

  return Response.json({ data: tag }, { status: status.HTTP_STATUS_CREATED });
});
