import React from 'react';
import Drawer from '../common/Drawer';
import { Box, TextField } from '@mui/material';

function ProductsDrawer(props: any) {
  const {
    onClickCancel,
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
      onClickCancel={onClickCancel}
      buttonText={'+ Add Product'}
      onClickSubmit={onClickSubmit}
      open={open}
      setOpen={setOpen}
      setValues={setValues}
      setIsEdit={setIsEdit}
      values={[{ name: '', sku: '', gst: '', price: '', hsn: '', stock: 1 }]}
    >
      <Box m={2} display={'flex'} flexDirection={'column'} gap={'16px'}>
        <TextField
          style={{ width: '240px' }}
          onChange={(e: any) => onChange('name', e)}
          required
          fullWidth
          value={values.name}
          label='Name'
          type='text'
          id='name'
        />
        <TextField
          style={{ width: '240px' }}
          onChange={(e: any) => onChange('sku', e)}
          required
          value={values.sku}
          fullWidth
          label='SKU'
          type='text'
          id='sku'
        />
        <TextField
          style={{ width: '240px' }}
          onChange={(e: any) => onChange('hsn', e)}
          required
          fullWidth
          value={values.hsn}
          label='HSN'
          type='text'
          id='hsn'
        />
        <TextField
          style={{ width: '240px' }}
          onChange={(e: any) => onChange('price', e)}
          required
          fullWidth
          value={values.price}
          label='Price'
          type='text'
          id='price'
        />
        <TextField
          style={{ width: '240px' }}
          onChange={(e: any) => onChange('gst', e)}
          required
          fullWidth
          value={values.gst}
          label='GST'
          type='text'
          id='gst'
        />
        <TextField
          style={{ width: '240px' }}
          onChange={(e: any) => onChange('stock', e)}
          required
          fullWidth
          value={values.stock}
          label='Stock Count'
          type='text'
          id='stock'
        />
      </Box>
    </Drawer>
  );
}

export default ProductsDrawer;
