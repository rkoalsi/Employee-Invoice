import React from 'react';
import { useUserContext } from '../context/user';
import Router from 'next/router';
import { isObjectEmpty } from '../helpers/validations';
import { Button, Grid, Typography, Box } from '@mui/material';
interface Props {}

function Home(props: Props) {
  const {} = props;
  const [user, setUser] = useUserContext();
  const redirectToOrg = () => Router.push(`/${user.user.organizationId}`);
  const redirectToLogin = () => Router.push('/login');
  const redirectToDashboard = () => Router.push('/dashboard');
  const logout = () => {
    setUser({});
    redirectToLogin();
  };
  if (user.token) {
    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent='center'
        flexDirection={'column'}
      >
        <Typography variant={'h2'}>Welcome {user.user.name}</Typography>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent='center'
          flexDirection={'row'}
          gap={'8px'}
        >
          <Button
            onClick={redirectToDashboard}
            color={'secondary'}
            variant={'contained'}
          >
            Dashboard
          </Button>
          <Button onClick={logout} variant={'contained'}>
            Logout
          </Button>
          <Button
            onClick={redirectToOrg}
            color={'secondary'}
            variant={'contained'}
          >
            Organization
          </Button>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent='center'
      flexDirection={'column'}
    >
      <Typography variant={'h2'}>Welcome</Typography>
      <Button onClick={redirectToLogin} variant={'contained'}>
        Login
      </Button>
    </Box>
  );
}

export default Home;
