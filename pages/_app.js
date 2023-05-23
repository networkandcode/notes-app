// pages/_app.js
import Authenticate from '../components/Authenticate'
import { DataProvider } from '../hooks/useData'
import '../styles/global.css'

import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <DataProvider>
        <Authenticate/>
        <Component {...pageProps} />
      </DataProvider>
    </UserProvider>
  );
}