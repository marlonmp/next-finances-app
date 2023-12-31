import AccountCard, { AccountCardSkeleton } from './accountCard';

export function AccountListSkeleton() {
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      <AccountCardSkeleton />
      <AccountCardSkeleton />
      <AccountCardSkeleton />
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

export default async function AccountList() {
  const accounts = await getAccounts();

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {!accounts?.length ?
        emptyList :
        accounts?.map((account, i) => <AccountCard key={account.id} tabIndex={i + 1} account={account} />)}
    </div>
  );
}
