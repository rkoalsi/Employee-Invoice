import React from 'react';
import Sidebar from '../core/Sidebar';
import { useUserContext } from '../../context/user';
import styled from 'styled-components';
import { Box, Button } from '@mui/material';
import Router from 'next/router';

function Main({ children }: any) {
  const [user, setUser] = useUserContext();
  const onClickSignOut = () => {
    setUser({});
    Router.push('/login');
  };
  return (
    <Container>
      {user && user.token && <Sidebar />}
      {user && user.token && (
        <Box
          top={0}
          right={0}
          component='span'
          m={1}
          display='flex'
          justifyContent='end'
          alignItems='center'
        >
          <Button
            variant='contained'
            color='primary'
            sx={{ height: 40 }}
            onClick={onClickSignOut}
          >
            Sign Out
          </Button>
        </Box>
      )}
      {children}
    </Container>
  );
}

export default Main;

const Container = styled.div``;
