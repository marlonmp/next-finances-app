'use client';

import { useState } from 'react';

import AccountCard from './accountCard';

export default function AccountList({ accounts = [] }) {
  const [selected, setSelected] = useState(null);

  const emptyList = (
    <div className='w-full h-40 flex justify-center'>
      <div className='self-center italic text-slate-400'>There are not accounts to list</div>
    </div>
  );

  function accountCardMapper(account, i) {
    return (
      <AccountCard key={account.id} tabIndex={i + 1}
        account={account} active={selected === account.id}
        onClick={() => setSelected(account.id)} />
    );
  }

  const accountCardsList = (
    <div className='w-max flex flex-row flex-nowrap gap-6'>
      {accounts.map(accountCardMapper)}
    </div>
  );

  return (
    <div className='overflow-x-auto p-1 pb-4'>
      {!!accounts?.length ? accountCardsList : emptyList}
    </div>
  );
}
