import React from 'react';
import Drawer from '../common/Drawer';
import { Box, TextField } from '@mui/material';
import DropDown from '../common/DropDown';
import { ROLES } from '../auth/Register';

function EmployeesDrawer(props: any) {
  const {
    onChange,
    values,
    open,
    onClickSubmit,
    setOpen,
    setIsEdit,
    setValues,
  } = props;
  return (
    <Drawer
      buttonText={'+ Add Employee'}
      open={open}
      onClickSubmit={onClickSubmit}
      setOpen={setOpen}
      setIsEdit={setIsEdit}
      setValues={setValues}
      onClickCancel={() => setValues({ name: '', role: '', email: '' })}
      values={{ name: '', role: '', email: '' }}
    >
      <Box m={2} display={'flex'} flexDirection={'column'} gap={'16px'}>
        <TextField
          style={{ width: '240px' }}
          onChange={(e: any) => onChange('name', e.target.value)}
          required
          fullWidth
          label='Name'
          type='text'
          id='Name'
          value={values.name}
        />
        <DropDown
          items={[ROLES[0], ROLES[2]]}
          label={'Role'}
          onChange={onChange}
          value={values.role}
          onChangeTitle={'role'}
        />
        <TextField
          style={{ width: '240px' }}
          onChange={(e: any) => onChange('email', e.target.value)}
          required
          fullWidth
          label='Email'
          type='email'
          value={values.email}
          id='Email'
        />
      </Box>
    </Drawer>
  );
}

export default EmployeesDrawer;
