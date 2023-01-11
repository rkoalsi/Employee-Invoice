import React from 'react';
import { useUserContext } from '../../context/user';
import Drawer from '../common/Drawer';
import { TextField, Box } from '@mui/material';

function SalesOrdersDrawer(props: any) {
  const { onChange, values } = props;
  return (
    <Drawer buttonText={'+ Add Sales Order'}>
      <Box m={2} display={'flex'} flexDirection={'column'} gap={'16px'}>
        <TextField
          style={{ width: '240px' }}
          // onChange={(e: any) => onChange('organizationId', e.target.value)}
          required
          fullWidth
          label='Customer'
          type='text'
          id='Customer'
          autoComplete='new-password'
        />
        <TextField
          style={{ width: '240px' }}
          // onChange={(e: any) => onChange('organizationId', e.target.value)}
          required
          fullWidth
          label='Product'
          type='text'
          id='Product'
          autoComplete='new-password'
        />
        <TextField
          style={{ width: '240px' }}
          // onChange={(e: any) => onChange('organizationId', e.target.value)}
          required
          fullWidth
          label='Amount'
          type='text'
          id='Amount'
          autoComplete='new-password'
        />
      </Box>
    </Drawer>
  );
}

export default SalesOrdersDrawer;
