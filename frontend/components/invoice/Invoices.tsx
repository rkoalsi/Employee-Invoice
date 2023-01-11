import { Box } from '@mui/material';
import React from 'react';
import { useUserContext } from '../../context/user';
import InvoiceDrawer from './InvoiceDrawer';

interface Props {}

function Invoices(props: Props) {
  const [user, setUser] = useUserContext();
  return (
    <Box
      component='span'
      m={8}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      Total Number of Invoices: {user?.user?.invoices.length}
      <InvoiceDrawer />
    </Box>
  );
}

export default Invoices;
