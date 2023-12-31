'use client';

import { useState } from 'react';

import AccountList from'./components/accountList';

export default function Transactions () {
  const [account, setAccount] = useState(null);

  return (
    <div className='flex flex-col items-center gap-6'>
      <AccountList onSelect={setAccount}/>

      <div className='w-11/12 h-px bg-slate-600'></div>

      {account?.name}
    </div>
  );
}
