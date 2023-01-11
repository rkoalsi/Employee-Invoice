import React from 'react';
import Sidebar from '../core/Sidebar';
import { useUserContext } from '../../context/user';

function Main({ children }: any) {
  const [user, setUser] = useUserContext();
  return (
    <>
      {user && user.token && <Sidebar />}
      {children}
    </>
  );
}

export default Main;
