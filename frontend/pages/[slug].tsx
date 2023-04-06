import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getOrganizations } from '../api/organizations';
import {
  Box,
  Card,
  Typography,
  CardContent,
  Snackbar,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import Main from '../components/common/Main';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InventoryIcon from '@mui/icons-material/Inventory';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { createPurchase } from '../api/purchase';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';
import { OrganizationData, ProductData } from '../types';
interface Data {
  _id: string;
  name: string;
  gstin: string;
  location: string;
  created_at: string;
  updated_at: string;
  __v: number;
  products: [];
}
interface Products {
  productId?: string;
  amount: number;
}
function OrganizationPage(props: { data: Data; hasError: boolean }) {
  const router = useRouter();
  const [next, setNext] = React.useState(false);
  const [existingCustomer, setExistingCustomer] = React.useState(false);
  const [message, setMessage] = React.useState(`Enter Amount To Buy`);
  const [val, setVal] = React.useState<{
    name: string;
    email: string;
    address: string;
    amount: string | number;
    total: string | number;
    phone: string | number;
    productId: string;
    createdBy: string;
    organizationId: string;
    products: Products[];
  }>({
    name: '',
    email: '',
    address: '',
    products: [],
    amount: '' && 0,
    total: '' && 0,
    productId: '',
    organizationId: '',
    createdBy: '',
    phone: '' && 0,
  });
  const [data, setData] = React.useState<OrganizationData | null>(null);
  const getData = async () => {
    try {
      const res = await getOrganizations();
      if (res.status == 200) {
        setData(
          res.data.filter(
            (d: any) => d._id === router.asPath.replace('/', '')
          )[0]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [qty, setQty] = React.useState<Products[] | undefined>();
  React.useEffect(() => {
    getData();
  }, []);

  const handleNext = () => {
    setNext(true);
  };
  const handleChange = (str: string, i?: number, e?: any) => {
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
        // var tot = Number(data.price) * Number(val.amount);
        // var tax = tot * (Number(data.gst) / 100);
        // var total = tot + tax;
        // setVal({
        //   ...val,
        //   organizationId: data.organizationId,
        //   productId: data._id,
        //   createdBy: data.createdBy,
        //   total: Number(total),
        // });
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
  const q = data?.products
    .map((d: ProductData): Products[] => ({
      productId: d._id,
      amount: 0,
    }))
    .flat();
  React.useEffect(() => {
    setQty(q);
  }, [data?.products]);
  const onChangeQty = (id: string, index: number, e: any) => {
    var qt = [...qty];
    qt[index] = { productId: id, amount: Number(e) };
    setQty(qt);
    setVal({ ...val, amount: qt?.reduce((n, { amount }) => n + amount, 0) });
  };
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const [open, setOpen] = React.useState(false);
  const [sOpen, setsOpen] = React.useState(false);
  const handleOpen = () => {
    console.log(val);
    if (data) {
      handleChange('organizationId');
    }
    if (val.amount === '' || val.amount === 0) {
      setsOpen(true);
    }
    if (val.amount > props?.data?.products[0]?.stock) {
      setsOpen(true);
      setMessage('Quantity to be purchased is more than actual stock');
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
  const onClickProduct = (d: any) => {
    router.push(`/product/${d._id}`);
  };
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <Main>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'8px'}
        mt={'32px'}
      >
        <Card style={{ textAlign: 'center', width: '725px', height: '150px' }}>
          <CardContent>
            <Typography variant='h2'>
              Organization Name: {props.data.name}
            </Typography>
            <Typography variant='h2'>GSTIN: {props.data.gstin}</Typography>
            <Typography variant='h2'>
              Location: {props.data.location}
            </Typography>
          </CardContent>
        </Card>
        <Typography
          variant='h2'
          mt={'32px'}
        >{`Organization's Products`}</Typography>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'row'}
          gap={'16px'}
        >
          {props.data.products?.length > 0 &&
            props.data.products?.map((d: ProductData, i: number) => (
              <Box
                key={d.name}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                <Card
                  style={{
                    textAlign: 'center',
                    width: 'fit-content',
                    height: '175px',
                  }}
                  onClick={() => onClickProduct(d)}
                >
                  <CardContent>
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      flexDirection={'column'}
                      gap={'16px'}
                    >
                      <Typography
                        variant='h3'
                        style={{ textDecorationLine: 'underline' }}
                        key={d.name}
                      >
                        {d.name}
                      </Typography>
                      <Typography
                        variant='h3'
                        style={{ textDecorationLine: 'underline' }}
                        key={d.price}
                      >
                        INR {d.price}
                      </Typography>
                      <Typography
                        variant='h3'
                        style={{ textDecorationLine: 'underline' }}
                        key={d.stock}
                      >
                        {d.stock} pcs
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                <Box
                  display={'flex'}
                  mt={'20px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  flexDirection={'row'}
                  gap={'16px'}
                >
                  <Box width={'100px'}>
                    <TextField
                      color='info'
                      id='outlined-number'
                      label='Quantity'
                      type='number'
                      // InputProps={{
                      //   inputProps: {
                      //     pattern: '[0-9]*',
                      //     min: 1,
                      //   },
                      // }}
                      value={qty ? qty[i].amount : 0}
                      onChange={(e) => onChangeQty(d._id, i, e.target.value)}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
      <Box
        display={'flex'}
        mt={'20px'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={'8px'}
      >
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
              color='info'
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
              onChange={(e) => handleChange('amount', Number(e.target.value))}
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
                      onChange={(e) =>
                        handleChange('phone', Number(e.target.value))
                      }
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
                        <ArrowBackIosNewOutlined
                          onClick={() => setNext(false)}
                        />
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
                          onChange={() =>
                            setExistingCustomer(!existingCustomer)
                          }
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
    </Main>
  );
}

export default OrganizationPage;
async function getData() {
  const res = await getOrganizations();
  return res.data;
}
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();
  const pathsWithParams = data.map((d: Data) => ({
    params: { slug: d._id },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const itemID = context.params?.slug;
  const data = await getData();
  const foundItem = data.find((item: Data) => itemID === item._id);

  if (!foundItem) {
    return {
      props: { hasError: true },
      notFound: true,
    };
  }

  return {
    props: {
      data: foundItem,
    },
  };
};
