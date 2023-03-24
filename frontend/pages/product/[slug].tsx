import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getProduct } from '../../api/product';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InventoryIcon from '@mui/icons-material/Inventory';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Typography,
  Snackbar,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { ProductData } from '../../types';
import { createPurchase } from '../../api/purchase';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';
function ProductPage(props: { data: ProductData; hasError: boolean }) {
  const router = useRouter();
  const [next, setNext] = React.useState(false);
  const [existingCustomer, setExistingCustomer] = React.useState(false);
  const [message, setMessage] = React.useState(`Enter Amount To Buy`);
  const [val, setVal] = React.useState<{
    amount: string | number;
    total: string | number;
    phone: string | number;
    productId: string;
    createdBy: string;
    organizationId: string;
    name: string;
    email: string;
    address: string;
  }>({
    amount: '' && 0,
    total: '' && 0,
    productId: '',
    organizationId: '',
    createdBy: '',
    name: '',
    email: '',
    phone: '' && 0,
    address: '',
  });
  const handleNext = () => {
    setNext(true);
  };
  const handleChange = (str: string, e?: any) => {
    switch (str) {
      case 'name':
        setVal({ ...val, name: e });
        break;
      case 'email':
        setVal({ ...val, email: e });
        break;
      case 'address':
        setVal({ ...val, address: e });
        break;
      case 'organizationId':
        var tot = Number(props.data.price) * Number(val.amount);
        var tax = tot * (Number(props.data.gst) / 100);
        var total = tot + tax;
        setVal({
          ...val,
          organizationId: props.data.organizationId,
          productId: props.data._id,
          createdBy: props.data.createdBy,
          total: Number(total),
        });
        break;
      case 'phone':
        setVal({ ...val, phone: Number(e) });
        break;
      case 'amount':
        setVal({ ...val, amount: Number(e) });
        break;
      default:
        break;
    }
  };
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const [open, setOpen] = React.useState(false);
  const [sOpen, setsOpen] = React.useState(false);
  const handleOpen = () => {
    if (props.data) {
      handleChange('organizationId');
    }
    if (val.amount === '' || val.amount === 0) {
      setsOpen(true);
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setNext(false);
    setExistingCustomer(false);
    setOpen(false);
  };
  const handleSubmit = async () => {
    handleClose();
    const res = await createPurchase(val);
    if (res.data) {
      setMessage(res.data);
      setsOpen(true);
      refreshData();
    }
  };
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box
      display={'flex'}
      mt={'20px'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      gap={'8px'}
    >
      <Typography variant='h2'>Product ID: {props.data._id}</Typography>
      <Typography variant='h2'>Product Name: {props.data.name}</Typography>
      <Typography variant='h2'>Product GST: {props.data.gst}%</Typography>
      <Typography variant='h2'>Product Sku: {props.data.sku} </Typography>
      <Typography variant='h2'>
        Product Price: {props.data.price} INR
      </Typography>
      <Typography variant='h2'>
        Product Stock: {props.data.stock} pcs
      </Typography>
      {Number(val.amount) > 0 && (
        <Typography variant='h2'>
          Total:{' '}
          {Number(props.data.price) * Number(val.amount) +
            (Number(val.amount) *
              Number(props.data.price) *
              Number(props.data.gst)) /
              100}
          INR
        </Typography>
      )}
      <Box
        display={'flex'}
        mt={'20px'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'row'}
        gap={'16px'}
      >
        <Box sx={{ minWidth: 120 }}>
          <TextField
            id='outlined-number'
            label='Quantity'
            type='number'
            InputProps={{
              inputProps: {
                pattern: '[0-9]*',
                min: 1,
              },
            }}
            value={val.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
          />
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <Button
            variant='contained'
            color='success'
            size='large'
            onClick={handleOpen}
            startIcon={<InventoryIcon />}
          >
            BUY
          </Button>
          <Dialog open={open} onClose={handleClose}>
            {existingCustomer ? (
              <>
                <DialogTitle align='center'>
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    flexDirection={'row'}
                    gap={'16px'}
                  >
                    <ArrowBackIosNewOutlined
                      onClick={() => {
                        setNext(false);
                        setExistingCustomer(false);
                      }}
                    />
                    New Customer Details
                  </Box>
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Name'
                    type='text'
                    fullWidth
                    onChange={(e) => handleChange('name', e.target.value)}
                    value={val.name}
                    variant='standard'
                  />
                  <TextField
                    autoFocus
                    margin='dense'
                    id='address'
                    label='Address'
                    type='text'
                    fullWidth
                    onChange={(e) => handleChange('address', e.target.value)}
                    value={val.address}
                    variant='standard'
                  />
                  <TextField
                    autoFocus
                    margin='dense'
                    id='phone'
                    label='Phone Number'
                    type='tel'
                    fullWidth
                    onChange={(e) => handleChange('phone', e.target.value)}
                    value={val.phone}
                    variant='standard'
                  />
                  <TextField
                    autoFocus
                    margin='dense'
                    id='email'
                    label='Email Address'
                    type='email'
                    fullWidth
                    onChange={(e) => handleChange('email', e.target.value)}
                    value={val.email}
                    variant='standard'
                  />
                </DialogContent>
                <DialogActions>
                  <Button startIcon={<CloseIcon />} onClick={handleClose}>
                    Close
                  </Button>
                  <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
              </>
            ) : (
              <>
                <DialogTitle align='center' justifyContent={'space-between'}>
                  {next ? (
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      flexDirection={'row'}
                      gap={'16px'}
                    >
                      <ArrowBackIosNewOutlined onClick={() => setNext(false)} />
                      Existing Customer Details
                    </Box>
                  ) : (
                    `Customer Details`
                  )}
                </DialogTitle>
                <DialogContent>
                  {next ? (
                    <TextField
                      autoFocus
                      margin='dense'
                      id='email'
                      label='Email Address'
                      type='email'
                      fullWidth
                      onChange={(e) => handleChange('email', e.target.value)}
                      value={val.email}
                      variant='standard'
                    />
                  ) : (
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label='New Customer'
                        onChange={() => setExistingCustomer(!existingCustomer)}
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label='Existing Customer'
                        onChange={() => setNext(true)}
                      />
                    </FormGroup>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button startIcon={<CloseIcon />} onClick={handleClose}>
                    Close
                  </Button>
                  <Button onClick={next ? handleSubmit : handleNext}>
                    {next ? `Submit` : `Next`}
                  </Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </Box>
      </Box>
      <Snackbar
        open={sOpen}
        onClose={() => setsOpen(false)}
        autoHideDuration={2000}
        message={message}
      />
    </Box>
  );
}

export default ProductPage;
async function getData(id: any) {
  const res = await getProduct(id);
  return res.data;
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.slug;
  const data = await getData(id);

  if (!data) {
    return {
      props: { hasError: true },
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};
