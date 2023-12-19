import stryles from '@/styles/components.module.css';

export default function Header({ title, children }) {
  return <>
    <header className='bg-slate-900'>
      <div className='w-11/12 lg:w-1/2 mx-auto'>
        <div className='h-20 flex items-center space-x-6'>

          <div className='font-black text-2xl'>{title}</div>

          <div className='h-8 w-px bg-slate-200'></div>

          <nav className='flex flex-row flex-grow space-x-4'>
            {children}
          </nav>
        </div>
      </div>
    </header>
  </>;
};
