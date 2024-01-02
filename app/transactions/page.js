'use client';

import AccountList from './components/accountList';
import TransactionList from './components/transactionList';

export default function Transactions({ searchParams }) {
  const { account_id } = searchParams || {};

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='w-full'>
        <div className='w-full text-md mb-4'>Accounts</div>
        <AccountList key={'accountlist'} />
      </div>

      <div className='w-full'>
        <div className='w-full text-md mb-4'>Transactions</div>

        <TransactionList account_id={account_id} />
      </div>
    </div>
  );
}
