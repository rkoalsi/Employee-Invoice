import React from 'react';
import Drawer from '../common/Drawer';
import { TextField, Box, Divider, Button } from '@mui/material';
import DropDown from '../common/DropDown';
import { DeleteForeverOutlined } from '@mui/icons-material';

function EstimatesDrawer(props: any) {
  const {
    onChange,
    values,
    open,
    customers,
    products,
    onClickSubmit,
    setOpen,
    setIsEdit,
    setValues,
  } = props;

  const onClickCancel = () => {
    setValues({ customer: '', products: [] });
  };
  const onClickAdd = () => {
    setValues({ ...values, products: [...values.products, {}] });
  };
  const deleteRow = (i: number) => {
    var w = [...values.products];
    w.splice(i, 1);
    setValues({ ...values, products: w });
  };
  const nums = Array.from(Array(11).keys());
  var numbers: {}[] = [];
  for (let index = 1; index < nums.length; index++) {
    const element = nums[index];
    numbers[index] = { name: element, value: element };
  }
  return (
    <Drawer
      open={open}
      buttonText={'+ Add Estimate'}
      onClickSubmit={onClickSubmit}
      setOpen={setOpen}
      setIsEdit={setIsEdit}
      onClickCancel={onClickCancel}
      setValues={setValues}
      values={{ customer: { name: '' }, products: [] }}
    >
      <Box m={2} display={'flex'} flexDirection={'column'} gap={'16px'}>
        <DropDown
          value={values.customer._id}
          items={customers}
          label={'Customer'}
          onChange={onChange}
          onChangeTitle={'customer'}
        />
        {values.products.map((_: any, i: number) => (
          <Box
            display={'flex'}
            flexDirection={'row'}
            gap={'16px'}
            alignItems={'center'}
          >
            <DropDown
              value={values?.products[i]?.product?._id}
              items={products}
              label={'Products'}
              onChange={onChange}
              onChangeTitle={'products'}
              onChangeIndex={i}
            />
            <DropDown
              items={numbers}
              label={'Amount'}
              onChange={onChange}
              onChangeTitle={'amount'}
              onChangeIndex={i}
              value={values?.products[i]?.amount}
            />
            <DeleteForeverOutlined onClick={() => deleteRow(i)} />
          </Box>
        ))}
        <Button onClick={onClickAdd}>Add More Products</Button>
        <Divider />
        <TextField
          value={values.total}
          disabled
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
