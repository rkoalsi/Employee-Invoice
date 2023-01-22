import React from 'react';
import { useUserContext } from '../../context/user';
import { Box, Snackbar } from '@mui/material';
import ProductsDrawer from './ProductsDrawer';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../../api/product';
import ProductTable from './ProductTable';

interface Props {}

function Products(props: Props) {
  const [user, setUser] = useUserContext();
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);
  const [values, setValues] = React.useState({
    name: '',
    sku: '',
    gst: '',
    price: '',
    hsn: '',
    stock: 1,
  });

  const createData = async () => {
    try {
      const d = {
        ...values,
        organizationId: user.user.organizationId,
        createdBy: user.user._id,
      };
      const res = await createProduct(d);
      if (res.status == 200) {
        setMessage('Product Successfully Created');
        setShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateData = async () => {
    try {
      const d = { ...values, organizationId: user.user.organizationId };
      const data = await updateProduct(d);
      if (data.status == 200) {
        setMessage(data.data);
        setShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (r: string) => {
    try {
      const res = await deleteProduct(r);
      if (res.status == 200) {
        setMessage(res.data);
        setShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    try {
      const res = await getProducts(user.user.organizationId);
      if (res.status == 200) {
        console.log(res.data[0]);
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, [user, show]);

  const onChange = (str: string, e: any) => {
    switch (str) {
      case 'name':
        setValues({ ...values, name: e.target.value });
        break;
      case 'sku':
        setValues({ ...values, sku: e.target.value });
        break;
      case 'hsn':
        setValues({ ...values, hsn: e.target.value });
        break;
      case 'gst':
        setValues({ ...values, gst: e.target.value });
        break;
      case 'price':
        setValues({ ...values, price: e.target.value });
        break;
      case 'stock':
        setValues({ ...values, stock: e.target.value });
        break;
      default:
        break;
    }
  };
  return (
    <Box
      component='span'
      m={8}
      display='flex'
      flexDirection={'column'}
      gap={'16px'}
      justifyContent='center'
      alignItems='center'
    >
      <Snackbar
        open={show}
        autoHideDuration={3000}
        onClose={() => setShow(false)}
        message={message}
      />
      Total Number of Products: {data.length}
      <ProductsDrawer
        onChange={onChange}
        values={values}
        onClickSubmit={!isEdit ? createData : updateData}
        open={open}
        setOpen={setOpen}
        setValues={setValues}
        setIsEdit={setIsEdit}
      />
      <ProductTable
        columns={[
          'Name',
          'Sku',
          'HSN',
          'GST',
          'Price',
          'Stock',
          'Delete',
          'Edit',
        ]}
        rows={data}
        open={open}
        setOpen={setOpen}
        setValues={setValues}
        setIsEdit={setIsEdit}
        deleteData={deleteData}
      />
    </Box>
  );
}

export default Products;
