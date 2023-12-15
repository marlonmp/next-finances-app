import '@/app/ui/globals.css'

export const metadata = {
  title: 'Finances',
  description: 'A finances app to manage the monthly incomes and expenses',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>

      <body>
        <header className='bg-slate-900'>
          <div className='w-11/12 lg:w-1/2 mx-auto'>
            <div className='h-20 flex items-center space-x-6'>

              <div className='font-black text-2xl'>Finances</div>

              <nav className='flex flex-row flex-grow space-x-4'>
                <a className='px-4 py-2 rounded-md cursor-pointer text-slate-600 hover:text-blue-400 hover:bg-blue-950 text-slate-200'>Home</a>
                <a className='px-4 py-2 rounded-md cursor-pointer text-slate-600 hover:text-blue-400 hover:bg-blue-950'>Months</a>
                <a className='px-4 py-2 rounded-md cursor-pointer text-slate-600 hover:text-blue-400 hover:bg-blue-950'>Balance</a>
              </nav>
            </div>
          </div>
        </header>

        <div className='w-11/12 lg:w-1/2 mx-auto mt-12'>
          {children}
        </div>
      </body>
    </html>
  )
}
