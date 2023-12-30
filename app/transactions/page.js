import AccountList from'./components/accountList';

export default async function Transactions () {
  const res = await fetch('http://localhost:3000/api/accounts', { cache: 'no-store' });
  const { data: accounts } = await res.json();

  return (
    <div>
      <AccountList accounts={accounts}/>
    </div>
  );
}
