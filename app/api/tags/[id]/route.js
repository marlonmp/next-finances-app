import prisma from '@/lib/prisma';
import * as status from '@/lib/http.status';
import withErrorHandler from '@/lib/error.handler';

import { tagIdValidator, tagUpdateValidator } from '../validators';


export const GET = withErrorHandler(async function (req, { params }) {
  const tag = await tagIdValidator.parseAsync(params.id);

  return Response.json({ data: tag }, { status: status.HTTP_STATUS_OK });
});


export const PUT = withErrorHandler(async function (req, { params }) {
  const tag = await tagIdValidator.parseAsync(params.id);

  const jsonData = await req.json();

  const data = await tagUpdateValidator.parseAsync(jsonData);

  const updatedTag = await prisma.tag.update({ data, where: { id: tag.id } });

  return Response.json({ data: updatedTag }, { status: status.HTTP_STATUS_OK });
});


export const DELETE = withErrorHandler(async function (req, { params }) {
  const tag = await tagIdValidator.parseAsync(params.id);

  const deletedTag = await prisma.tag.delete({ where: { id: tag.id } });

  return Response.json({ data: deletedTag }, { status: status.HTTP_STATUS_ACCEPTED });
});
