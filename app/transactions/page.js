'use client';

import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

import AccountList from './components/accountList';
import TransactionList from './components/transactionList';

import AccountModal from './components/accountModal';

export default function Transactions({ searchParams }) {
  const { account_id } = searchParams || {};

  const [accountModalOpened, accountModal] = useDisclosure(false);

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='w-full'>
        <div className='w-full mb-6 flex flex-row justify-between items-center'>
          <div className=' text-md'>Accounts</div>

          <Button color='green' leftSection={<IconPlus />} onClick={accountModal.open}>Add account</Button>
        </div>

        <AccountList key={'accountlist'} />
      </div>

      <div className='w-full'>
        <div className='w-full mb-6 flex flex-row justify-between items-center'>
          <div className='text-md'>Transactions</div>

          <Button color='green' leftSection={<IconPlus />}>Add transaction</Button>
        </div>

        <TransactionList account_id={account_id} />
      </div>

      <AccountModal opened={accountModalOpened} onClose={accountModal.close} />
    </div>
  );
}
