'use client';

import { Suspense, useState } from 'react';

import AccountList from './components/accountList';
import TransactionList from './components/transactionList';

export default function Transactions() {
  const [account, setAccount] = useState(null);

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='w-full'>
        <div className='w-full text-md mb-4'>Accounts</div>

        <AccountList onSelect={setAccount} />
      </div>

      <div className='w-full'>
        <div className='w-full text-md mb-4'>Transactions</div>

        <Suspense fallback={<>...loading transactions</>}>
          <TransactionList account_id=''/>
        </Suspense>
      </div>
    </div>
  );
}
