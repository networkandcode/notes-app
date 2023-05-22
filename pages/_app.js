// pages/_app.js
import LogoutComponent from '../components/LogoutComponent'
import { DataProvider } from '../hooks/useData'
import '../styles/global.css'

import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <DataProvider>
        <LogoutComponent/>
        <Component {...pageProps} />
      </DataProvider>
    </UserProvider>
  );
}