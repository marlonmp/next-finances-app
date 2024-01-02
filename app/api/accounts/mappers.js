import { transactiontype } from '@prisma/client';

export function accountMapper({ transactions = [], ...account }) {
  transactions = transactions ?? [];

  function reduce(acc, { type, amount }) {
    return type === transactiontype.income ? acc + amount : acc - amount;
  }

  const balance = transactions.reduce(reduce, 0);

  return { ...account, balance };
}
