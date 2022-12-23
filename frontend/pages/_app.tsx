import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '../context/user';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
