import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getProduct, getProducts } from '../../api/product';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InventoryIcon from '@mui/icons-material/Inventory';
import CloseIcon from '@mui/icons-material/Close';

interface Data {
  _id: string;
  name: string;
  sku: string;
  hsn: string;
  price: string;
  gst: string;
  stock: string;
  organizationId: string;
  createdBy: string;
  created_at: string;
  updated_at: string;
  __v: number;
}
function ProductPage(props: { data: Data; hasError: boolean }) {
  const router = useRouter();
  const [age, setAge] = React.useState('');
  const [val, setVal] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
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
      <Typography variant='h2'>Product Sku: {props.data.sku} </Typography>
      <Typography variant='h2'>
        Product Price: {props.data.price} INR
      </Typography>
      <Typography variant='h2'>
        Product Stock: {props.data.stock} pcs
      </Typography>
        <Box  display={'flex'}
        mt={'20px'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'row'}
        gap={'16px'}>  
    <Box sx={{ minWidth: 120 }}>
      <TextField
            id="outlined-number"
            label="Quantity"
            placeholder='eg: 1'
            type="number"
            InputProps={{
              inputProps: { 
                pattern: "[0-9]*",
                min: 1 }
            }}
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
    </Box>

    <Box sx={{ minWidth: 120 }}>
      <Button 
      variant="contained" 
      color='success' 
      size='large'
      onClick={handleOpen}
      startIcon={<InventoryIcon/>}>BUY</Button>
      <Dialog open={open} onClose={handleClose}>
      {/* <IconButton
              //edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            ><CloseIcon />
      </IconButton> */}
        <DialogTitle align='center'>Details</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="standard"
          />
        <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button startIcon={<CloseIcon/>} onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  </Box>
</Box>
  );
}

export default ProductPage;
async function getData(id: any) {
  const res = await getProduct(id);
  return res.data;
}
export const getStaticPaths: GetStaticPaths = async () => {
  // const data = await getData();
  // const pathsWithParams = data.map((d: Data) => ({
  //   params: { slug: d._id },
  // }));
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
