import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '../context/user';
import Auth from '../context/auth';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <UserProvider>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </UserProvider>
  );
}
