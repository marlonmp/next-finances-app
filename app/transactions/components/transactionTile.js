import DateTime from '@/app/components/DateTime';
import { currencyMapper, dateTimeMapper } from '@/lib/mappers';

export function TagBadgeSkeleton() {
  return (
    <div className='w-20 h-6 px-2 py-1 rounded-full bg-slate-700'></div>
  );
}

export function TransactionTileSkeleton() {
  return (
    <div className='flex flex-col gap-y-2 px-6 py-6 animate-pulse'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col gap-y-2'>
          <div className='w-36 h-7 rounded-md bg-slate-600'></div>
          <div className='w-48 h-3 rounded-md bg-slate-700'></div>
        </div>
        <div className='w-28 h-7 rounded-md bg-slate-600'></div>
      </div>
      <div className='flex flex-row gap-x-1'>
        <TagBadgeSkeleton />
        <TagBadgeSkeleton />
        <TagBadgeSkeleton />
      </div>
    </div>
  );
}

export function TagBadge({ tag }) {
  return (
    <div className='text-xs px-2 py-1 rounded-full border border-slate-500 text-slate-500 bg-slate-800'>#{tag.name}</div>
  );
}

export default function TransactionTile({ transaction }) {
  return (
    <div className='flex flex-col gap-y-2 px-6 py-6'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col'>
          <div className='font-bold text-lg'>{transaction.reference} | {transaction.account?.name}</div>
          <div className='text-xs text-slate-600'>
            <DateTime dateTime={transaction.updated_at}>{dateTimeMapper(transaction.updated_at)}</DateTime>
          </div>
        </div>
        <div className='font-black text-xl'>{currencyMapper(transaction.amount)}</div>
      </div>
      <div className='flex flex-row gap-x-1'>
        {transaction.tags.map((tag, i) => <TagBadge key={i} tag={tag}/>)}
      </div>
    </div>
  );
}
