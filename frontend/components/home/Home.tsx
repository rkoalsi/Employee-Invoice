import React from 'react';
import { useUserContext } from '../../context/user';
import Router from 'next/router';
import { Button } from '@mui/material';
interface Props {}

function Home(props: Props) {
  const {} = props;
  const [user, setUser] = useUserContext();

  const onClickSignOut = () => {
    setUser({});
    Router.push('/login');
  };

  if (user && user.token) {
    return (
      <>
        <div>Welcome {user.user.name}</div>
        <Button variant={'outlined'} onClick={onClickSignOut}>
          Sign Out
        </Button>
      </>
    );
  }

  return (
    <>
      <div>You are not logged in</div>
      <Button variant={'outlined'} onClick={onClickSignOut}>
        Log In
      </Button>
    </>
  );
}

export default Home;
