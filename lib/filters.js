import { orderingValidator, paginationValidator } from './validators';

/**
 * Returns the pagination parameters from the given request.
 * @param {Request} req
 * @returns {{ page: number, size: number, skip: number, take: number }}
 */
export function getPagination(req) {
  const { searchParams } = new URL(req.url);

  const jsonData = Object.fromEntries(searchParams);

  const { page, size } = paginationValidator.parse(jsonData);

  const skip = (page - 1) * size;
  const take = size;

  return { skip, take };
}

const prismaLookUps = {
  sw: 'startsWith',
  ew: 'endsWith',
  in: 'in',
  sh: 'search',
  rg: 'range',
};


/**
 * Returns prisma filters from the sarchParams.
 * @param {Request} req
 * @param {import('zod').ZodObject} zodFields
 * @returns {Promise<{} | { [string]: string | {[string]: string} }>}
 */
export async function getFilters(req, zodFields) {
  const { searchParams } = new URL(req.url);

  const jsonData = Object.fromEntries(searchParams);

  const filters = await zodFields.partial().parseAsync(jsonData);

  if (!Object.keys(filters).length) return {};

  const where = {};

  for (const [key, val] of Object.entries(filters)) {
    const [field, ...extraFields] = key.split('__');
    const lookUp = extraFields?.pop();

    if (!lookUp) {
      where[field] = val;
      continue;
    }

    const prismaLookUp = prismaLookUps[lookUp];

    if (prismaLookUp === prismaLookUps.rn) {
      const [min, max] = val;
      where[field] = { gte: min, lte: max };
      continue;
    }

    where[field] = { [prismaLookUp]: val };
  }

  return { where };
}


/**
 * Returns prisma ordering filters from the searchParams.
 * @param {Request} req
 * @param {string[]} orderingFields
 * @returns {{} | { orderBy: { [string]: string } }}
 */
export function getOrdering(req, orderingFields) {
  const { searchParams } = new URL(req.url);

  const jsonData = Object.fromEntries(searchParams);

  const { order_by, order } = orderingValidator.partial().parse(jsonData);

  if (!orderingFields.includes(order_by)) return {};

  return { orderBy: { [order_by]: order } };
}
