'use client';

import { useEffect, useState } from 'react';

import AccountCard from './accountCard';

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

export default function AccountList({ onSelect }) {
  const [accounts, setAccounts] = useState();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getAccounts().then(accounts => setAccounts(accounts));
  }, []);

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {!accounts?.length ?
        emptyList :
        accounts.map((account, i) => <AccountCard
          key={account.id} tabIndex={i + 1}
          account={account} active={selected === account.id}
          onClick={() => { setSelected(account.id); onSelect?.(account); }}
        />)}
    </div>
  );
}
