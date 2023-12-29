import dynamic from 'next/dynamic';

const AccountList = dynamic(() => import('./components/accountList'), { ssr: false });

export default async function Transactions () {
  const res = await fetch('http://localhost:3000/api/accounts', { cache: 'no-store' });
  const { data: accounts } = await res.json();

  return (
    <div>
      <AccountList accounts={accounts}/>
    </div>
  );
}
