import React from 'react';
import { useUserContext } from '../../context/user';
import { Box } from '@mui/material';
import SalesOrdersDrawer from './SalesOrdersDrawer';

interface Props {}

function SalesOrders(props: Props) {
  const [user, setUser] = useUserContext();
  return (
    <Box
      component='span'
      m={8}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      Total Number of Sales Orders: {user?.user?.salesOrders.length}
      <SalesOrdersDrawer />
    </Box>
  );
}

export default SalesOrders;
