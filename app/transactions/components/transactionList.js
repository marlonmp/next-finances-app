import TransactionTile, { TransactionTileSkeleton } from './transactionTile';

export function TransactionListSkeleton() {
  console.log('loading transactions');
  return (
    <div className='w-full flex flex-col divide-y-2 divide-slate-800 border-2 border-slate-800 rounded-lg'>
      <TransactionTileSkeleton />
      <TransactionTileSkeleton />
      <TransactionTileSkeleton />
    </div>
  );
}

async function getTransactions({ account_id }) {
  const searchParams = new URLSearchParams();

  if (account_id) searchParams.set('account_id', account_id);

  const res = await fetch(`http://localhost:3000/api/transactions?${searchParams}`, { cache: 'no-store' });
  const { data } = await res.json();

  return data;
}

const emptyList = (
  <div className='flex justify-center items-center'>
    There are no transactions found, try adding one
  </div>
);

export default async function TransactionList({ account_id }) {
  const transactions = await getTransactions({ account_id });

  return (
    <div className='w-full flex flex-col divide-y-2 divide-slate-800 border-2 border-slate-800 rounded-lg'>
      {!transactions?.length ? emptyList : transactions.map((transaction, i) => <TransactionTile key={i} transaction={transaction} />)}
    </div>
  );
}
