import '@/styles/globals.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import Header from '@/app/components/Header';
import HeaderLink from '@/app/components/HeaderLink';

export const metadata = {
  title:       'Finances',
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

        <div className='w-11/12 xl:max-w-7xl mx-auto my-12'>
          <AppRouterCacheProvider>
            {children}
          </AppRouterCacheProvider>
        </div>
      </body>
    </html>
  );
};
