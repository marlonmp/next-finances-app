import prisma from '@/lib/prisma';
import withErrorHandler from '@/lib/error.handler';

import { tagIdValidator, tagUpdateValidator } from '../validators';


export const GET = withErrorHandler(async function (req, { params }) {
  const tag = await tagIdValidator.parseAsync(params.id);

  return Response.json({data: tag}, {status: 200});
});


export const PUT = withErrorHandler(async function (req, { params }) {
  const tag = await tagIdValidator.parseAsync(params.id);

  const jsonData = await req.json();

  const data = await tagUpdateValidator.parseAsync(jsonData);

  const updatedtag = await prisma.tag.update({ data, where: { id: tag.id } });

  return Response.json({data: updatedtag}, {status: 200});
});


export const DELETE = withErrorHandler(async function (req, { params }) {
  const tag = await tagIdValidator.parseAsync(params.id);

  const deletedtag = await prisma.tag.delete({ where: { id: tag.id } });

  return Response.json({data: deletedtag}, {status: 202});
});
