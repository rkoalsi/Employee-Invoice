import React from 'react';
import Drawer from '../common/Drawer';
import { Box, TextField } from '@mui/material';

function CustomersDrawer(props: any) {
  const {
    onChange,
    values,
    onClickSubmit = () => {},
    open,
    setOpen,
    setValues,
    setIsEdit,
  } = props;
  return (
    <Drawer
      buttonText={'+ Add Customer'}
      onClickSubmit={onClickSubmit}
      open={open}
      setOpen={setOpen}
      setValues={setValues}
      setIsEdit={setIsEdit}
      values={{ name: '', shop: '', gstin: '', phone: '' }}
    >
      <Box m={2} display={'flex'} flexDirection={'column'} gap={'16px'}>
        <TextField
          style={{ width: '240px' }}
          onChange={(e: any) => onChange('name', e)}
          required
          value={values.name}
          fullWidth
          label='Name'
          type='text'
          id='name'
        />
        <TextField
          style={{ width: '240px' }}
          onChange={(e: any) => onChange('shop', e)}
          required
          value={values.shop}
          fullWidth
          label='Shop Name'
          type='text'
          id='shopName'
        />
        <TextField
          style={{ width: '240px' }}
          onChange={(e: any) => onChange('gstin', e)}
          required
          fullWidth
          value={values.gstin}
          label='GSTIN'
          type='text'
          id='gstin'
          autoComplete='new-password'
        />
        <TextField
          style={{ width: '240px' }}
          onChange={(e: any) => onChange('phone', e)}
          required
          value={values.phone}
          fullWidth
          label='Phone'
          type='phone'
          id='phone'
          autoComplete='new-password'
        />
      </Box>
    </Drawer>
  );
}

export default CustomersDrawer;
