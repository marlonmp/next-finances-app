import { AccountListSkeleton } from './components/accountList';
import { TransactionListSkeleton } from './components/transactionList';

export default function LoadingTransactions () {
  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='w-full'>
        <div className='w-full text-md mb-4'>Accounts</div>
        <AccountListSkeleton />
      </div>

      <div className='w-full'>
        <div className='w-full text-md mb-4'>Transactions</div>
        <TransactionListSkeleton />
      </div>
    </div>
  );
}
