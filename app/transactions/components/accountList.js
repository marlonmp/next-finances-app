'use client';

import { useState } from 'react';

import AccountCard from './accountCard';

export default function AccountList({ accounts = [] }) {
  const [selected, setSelected] = useState(null);

  const emptyList = (
    <div className='col-span-full min-h-40 flex items-center justify-center'>
      <div className='italic text-slate-400'>There are not accounts to list, try adding one</div>
    </div>
  );

  function accountCardMapper(account, i) {
    return (
      <AccountCard key={account.id} tabIndex={i + 1}
        account={account} active={selected === account.id}
        onClick={() => setSelected(account.id)} />
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {!accounts?.length ? emptyList : accounts.map(accountCardMapper)}
    </div>
  );
}
