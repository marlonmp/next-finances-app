'use client';

import { useEffect, useState } from 'react';

import { currencyMapper, dateTimeMapper } from '@/lib/mappers';
import styles from '@/styles/account-card.module.css';

/**
 * Account card
 * @param {{ account, active: boolean = false, tabIndex?: number }} props
 * @returns {JSX.Element}
 */
export default function AccountCard({ account, active = false, tabIndex, onClick }) {
  const activeClass = active ? styles.active : '';
  const className = `${styles.accountCard} ${activeClass}`;

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <div className={className} tabIndex={tabIndex} onClick={onClick}>
      <div className='font-bold text-xl'>{account.name}</div>
      <div className='text-md'>{account.type}</div>
      <div className='self-end mt-4 font-black text-lg text-slate-200'>{currencyMapper(account.balance)}</div>
      <div className='self-end text-xs text-slate-600'>
        <time dateTime={account.updated_at}>Last update at: {isMounted ? dateTimeMapper(account.updated_at) : '...'}</time>
      </div>
    </div>
  );
}
