import React from 'react';
import Drawer from '../common/Drawer';
import { TextField, Box } from '@mui/material';
import DropDown from '../common/DropDown';

function EstimatesDrawer(props: any) {
  const { onChange, values, customers, products, onClickSubmit } = props;
  return (
    <Drawer buttonText={'+ Add Estimate'} onClickSubmit={onClickSubmit}>
      <Box m={2} display={'flex'} flexDirection={'column'} gap={'16px'}>
        <DropDown
          items={customers}
          label={'Customer'}
          onChange={onChange}
          onChangeTitle={'customer'}
        />
        <DropDown
          items={products}
          label={'Products'}
          onChange={onChange}
          onChangeTitle={'products'}
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
export default EstimatesDrawer;
