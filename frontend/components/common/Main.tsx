import React from 'react';
import Sidebar from '../core/Sidebar';
import { useUserContext } from '../../context/user';
import styled from 'styled-components';

function Main({ children }: any) {
  const [user, setUser] = useUserContext();
  return (
    <Container>
      {user && user.token && <Sidebar />}
      {children}
    </Container>
  );
}

export default Main;

const Container = styled.div``;
