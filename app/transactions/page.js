'use client';

import { Suspense } from 'react';

import AccountList, { AccountListSkeleton } from './components/accountList';

import TransactionList, { TransactionListSkeleton } from './components/transactionList';

export default function Transactions({ searchParams }) {
  const { account_id } = searchParams || {};

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='w-full'>
        <div className='w-full text-md mb-4'>Accounts</div>
        <Suspense fallback={<AccountListSkeleton />}>
          <AccountList key={'accountlist'} />
        </Suspense>
      </div>

      <div className='w-full'>
        <div className='w-full text-md mb-4'>Transactions</div>

        <Suspense key={account_id?.toString() ?? 'suspense_transactrions'} fallback={<TransactionListSkeleton />}>
          <TransactionList account_id={account_id} />
        </Suspense>
      </div>
    </div>
  );
}
