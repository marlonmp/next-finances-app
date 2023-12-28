import styles from '@/styles/account-card.module.css';

export function AccountCard({ active = false }) {
  const activeClass = active ? styles.active : '';
  const className = `${styles.accountCard} ${activeClass}`;

  return (
    <div className={className}>
      <div className='font-bold text-xl'>Account name</div>
      <div className='text-md'>Account type</div>
      <div className='self-end mt-4 font-black text-lg text-slate-200'>$ 10,000,000.00</div>
      <div className='self-end text-xs text-slate-600'>Last update at: 12/12/2023 12:00 pm</div>
    </div>
  );
}
