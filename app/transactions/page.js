'use client';

import Button from '../components/Button';

import AccountList from './components/accountList';
import TransactionList from './components/transactionList';

export default function Transactions({ searchParams }) {
  const { account_id } = searchParams || {};

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='w-full'>
        <div className='w-full mb-6 flex flex-row justify-between items-center'>
          <div className=' text-md'>Accounts</div>

          <Button icon='add' label='Add account' color='green' />
        </div>
        <AccountList key={'accountlist'} />
      </div>

      <div className='w-full'>
        <div className='w-full mb-6 flex flex-row justify-between items-center'>
          <div className='text-md'>Transactions</div>

          <Button icon='add' label='Add transaction' color='green' />
        </div>

        <TransactionList account_id={account_id} />
      </div>
    </div>
  );
}
