'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useDisclosure } from '@mantine/hooks';
import { Button } from '@mantine/core';

import AccountCard, { AccountCardSkeleton } from './accountCard';
import AccountModal from './accountModal';
import { IconPlus } from '@tabler/icons-react';


export function AccountListSkeleton() {
  return (
    <div className='w-full'>
      <div className='w-full mb-6 flex flex-row justify-between items-center'>
        <div className='w-20 h-4 font-bold rounded-md bg-slate-600'></div>

        <div className='w-36 h-8 rounded-md bg-slate-700'></div>
      </div>
      <div className='w-full max-h-[340px] overflow-y-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <AccountCardSkeleton />
        <AccountCardSkeleton />
        <AccountCardSkeleton />
        <AccountCardSkeleton />
      </div>
    </div>
  );
};

async function getAccounts() {
  const res = await fetch('http://localhost:3000/api/accounts', { cache: 'no-store' });
  const { data: accounts } = await res.json();
  return accounts;
};

const emptyList = (
  <div className='col-span-full min-h-40 flex items-center justify-center'>
    <div className='italic text-slate-400'>There are not accounts to list, try adding one</div>
  </div>
);

export default function AccountList() {
  const [accounts, setAccounts] = useState(null);
  const router = useRouter();

  const [accountModalOpened, accountModal] = useDisclosure(false);

  function onSubmit(account) {
    const params = new URLSearchParams({ account_id: account.id });
    router.push(`transactions?${params}`);
  }

  useEffect(() => { getAccounts().then(accounts => setAccounts(accounts)); }, []);

  if (accounts === null) {
    return <AccountListSkeleton />;
  }

  return (
    <div className='w-full'>
      <div className='w-full mb-6 flex flex-row justify-between items-center'>
        <div className=' text-md'>Accounts</div>

        <Button color='green' leftSection={<IconPlus />} onClick={accountModal.open}>Add account</Button>
      </div>

      <div className='w-full max-h-[340px] pr-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {!accounts?.length ?
          emptyList :
          accounts?.map((account, i) => <AccountCard key={account.id} tabIndex={i + 1} account={account} />)}
      </div>

      <AccountModal opened={accountModalOpened} onClose={accountModal.close} onSubmit={onSubmit} />
    </div>
  );
}
