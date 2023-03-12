import React from 'react';
import { useUserContext } from '../../context/user';
import { Box, Snackbar } from '@mui/material';
import CustomersDrawer from './CustomersDrawer';
import {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from '../../api/customer';
import CustomerTable from './CustomerTable';
interface Props {}

function Customers(props: Props) {
  const [user, setUser] = useUserContext();
  const [data, setData] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [values, setValues] = React.useState({
    name: '',
    shop: '',
    gstin: '',
    phone: '',
    email: '',
  });

  const createData = async () => {
    try {
      const d = { ...values, organizationId: user.user.organizationId };
      const data = await createCustomer(d);
      if (data.status == 200) {
        setMessage('Customer Successfully Created');
        setValues({ name: '', shop: '', gstin: '', phone: '', email: '' });
        setShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onClickCancel = () => {
    setValues({ name: '', shop: '', gstin: '', phone: '', email: '' });
  };
  const deleteCustom = async (r: string) => {
    try {
      const res = await deleteCustomer(r);
      if (res.status == 200) {
        setMessage(res.data);
        setShow(true);
      }
    } catch (error: any) {
      setMessage(error.message);
      setShow(true);
    }
  };
  const updateData = async () => {
    try {
      const d = { ...values, organizationId: user.user.organizationId };
      const data = await updateCustomer(d);
      if (data.status == 200) {
        setMessage(data.data);
        setShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    try {
      const res = await getCustomers(user.user.organizationId);
      if (res.status == 200) {
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
      case 'shop':
        setValues({ ...values, shop: e.target.value });
        break;
      case 'gstin':
        setValues({ ...values, gstin: e.target.value });
        break;
      case 'phone':
        setValues({ ...values, phone: e.target.value });
        break;
      case 'email':
        setValues({ ...values, email: e.target.value });
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
      gap={'16px'}
      flexDirection={'column'}
      justifyContent='center'
      alignItems='center'
    >
      <Snackbar
        open={show}
        autoHideDuration={3000}
        onClose={() => setShow(false)}
        message={message}
      />
      Total Number of Customers: {data.length}
      <CustomersDrawer
        onChange={onChange}
        values={values}
        onClickSubmit={!isEdit ? createData : updateData}
        open={open}
        setOpen={setOpen}
        setValues={setValues}
        onClickCancel={onClickCancel}
        setIsEdit={setIsEdit}
      />
      <CustomerTable
        rows={data}
        columns={['Name', 'Shop', 'GSTIN', 'Email', 'Phone', 'Delete', 'Edit']}
        open={open}
        deleteCustom={deleteCustom}
        setOpen={setOpen}
        setValues={setValues}
        setIsEdit={setIsEdit}
      />
    </Box>
  );
}

export default Customers;
