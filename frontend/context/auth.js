import React from 'react';
import { useUserContext } from '../context/user';
import Router from 'next/router';
import { isObjectEmpty } from '../helpers/validations';

function Auth(props) {
  const {} = props;
  const [user, setUser] = useUserContext();
  React.useEffect(() => {
    const str = /^[0-9a-fA-F]{24}$/;
    if (
      window.location.pathname === '/' ||
      window.location.pathname.includes('login') ||
      window.location.pathname.includes('register') ||
      window.location.pathname.includes('forgot-password') ||
      Router.pathname.endsWith('/[slug]')
    ) {
    } else {
      if (!user.loading && isObjectEmpty(user)) {
        Router.push('/login');
      }
    }
  }, [user]);

  return <>{props.children}</>;
}

export default Auth;
