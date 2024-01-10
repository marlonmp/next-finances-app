'use client';

import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import AccountList from './components/accountList';
import TransactionList from './components/transactionList';

export default function Transactions({ searchParams }) {
  const { account_id } = searchParams || {};

  return (
    <div className='flex flex-col items-center gap-8'>
      <AccountList key={'accountlist'} />

      <div className='w-full'>
        <div className='w-full mb-6 flex flex-row justify-between items-center'>
          <div className='text-md'>Transactions</div>

          <Button color='green' leftSection={<IconPlus />}>Add transaction</Button>
        </div>

        <TransactionList account_id={account_id} />
      </div>
    </div>
  );
}
