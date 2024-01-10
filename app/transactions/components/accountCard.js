'use client';

import { ActionIcon } from '@mantine/core';

import { currencyMapper, dateTimeMapper } from '@/lib/mappers';

import styles from '@/styles/account-card.module.css';
import DateTime from '@/app/components/DateTime';

import { useSearchParams, useRouter } from 'next/navigation';
import { IconEdit, IconTrash } from '@tabler/icons-react';


export function AccountCardSkeleton() {
  return (
    <div className='min-w-60 p-4 flex flex-col gap-2 rounded-md border-[1px] border-slate-600 bg-slate-800 animate-pulse'>
      <div className='flex flex-row flex-nowrap justify-between'>
        <div className='w-40 h-6 font-bold rounded-md bg-slate-600'></div>
        <div className='flex flex-row flex-nowrap gap-x-1'>
          <span className='w-6 h-6 rounded-md bg-slate-700'></span>
          <span className='w-6 h-6 rounded-md bg-slate-700'></span>
        </div>
      </div>
      <div className='w-20 h-3 rounded-md bg-slate-700'></div>
      <div className='w-28 h-7 mt-4 self-end rounded-md bg-slate-600'></div>
      <div className='w-48 h-3 self-end rounded-md bg-slate-700'></div>
    </div>
  );
};


/**
 * Account card
 * @param {{ account, active: boolean = false, tabIndex?: number,
 * onEdit?: (Object) => void, onDelete?: (Object) => void }} props
 * @returns {JSX.Element}
 */
export default function AccountCard({ account, tabIndex, onEdit, onDelete }) {
  const searchParams = useSearchParams() || {};
  const account_id = searchParams.get('account_id');

  const activeClass = account_id === account.id ? styles.active : '';
  const className = `${styles.accountCard} ${activeClass}`;

  const { push } = useRouter();

  function onClick() {
    const searchParams = new URLSearchParams({ account_id: account.id });
    push(`/transactions?${searchParams}`);
  }

  return (
    <div className={className} tabIndex={tabIndex} onClick={onClick}>
      <div className='flex flex-row flex-nowrap justify-between'>
        <div className='font-bold text-xl'>{account.name}</div>
        <div className='flex flex-row flex-nowrap gap-x-1'>
          <ActionIcon variant='subtle' color='gray' size='sm' radius='sm' aria-label='edit account' onClick={() => onEdit?.(account)}>
            <IconEdit size={24} stroke={1} />
          </ActionIcon>
          <ActionIcon variant='subtle' color='red' size='sm' radius='sm' aria-label='delete account' onClick={() => onDelete?.(account)}>
            <IconTrash size={24} stroke={1} />
          </ActionIcon>
        </div>
      </div>
      <div className='text-md'>{account.type}</div>
      <div className='self-end mt-4 font-black text-lg text-slate-200'>{currencyMapper(account.balance)}</div>
      <div className='self-end text-xs text-slate-600'>
        <DateTime dateTime={account.updated_at}>Last update at: {dateTimeMapper(account.updated_at)}</DateTime>
      </div>
    </div>
  );
}
