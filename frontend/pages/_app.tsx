import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '../context/user';
import Auth from '../context/auth';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '../theme/ThemeProvider';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider>
      <CssBaseline />
      <UserProvider>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </UserProvider>
    </ThemeProvider>
  );
}
