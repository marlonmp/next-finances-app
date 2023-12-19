import '@/styles/globals.css';

import HeaderLink from '@/app/compoents/HeaderLink';
import Header from './compoents/Header';

export const metadata = {
  title: 'Finances',
  description: 'A finances app to manage the monthly incomes and expenses',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>

        <Header title='Finances'>
          <HeaderLink label='Home' href='/home'/>
          <HeaderLink label='Transactions' href='/transactions'/>
          <HeaderLink label='Statistics' href='/statistics'/>
        </Header>

        <div className='w-11/12 lg:w-1/2 mx-auto mt-12'>
          {children}
        </div>

      </body>
    </html>
  );
};
