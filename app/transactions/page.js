'use client';

import { useState } from 'react';

import AccountList from './components/accountList';
import TransactionList from './components/transactionList';

import AccountModal from './components/accountModal';

export default function Transactions({ searchParams }) {
  const { account_id } = searchParams || {};

  const [accountModal, setAccountModal] = useState(false);

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='w-full'>
        <div className='w-full mb-6 flex flex-row justify-between items-center'>
          <div className=' text-md'>Accounts</div>

          <button>Add account</button>
        </div>

        <AccountList key={'accountlist'} />
      </div>

      <div className='w-full'>
        <div className='w-full mb-6 flex flex-row justify-between items-center'>
          <div className='text-md'>Transactions</div>

          <button>Add transaction</button>
        </div>

        <TransactionList account_id={account_id} />
      </div>

      <AccountModal open={accountModal} onClose={() => setAccountModal(false)} />
    </div>
  );
}
