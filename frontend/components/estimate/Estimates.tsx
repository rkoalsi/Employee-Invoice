import React from 'react';
import { useUserContext } from '../../context/user';
import { Box, Snackbar } from '@mui/material';
import EstimatesDrawer from './EstimatesDrawer';
import { getCustomers } from '../../api/customer';
import { getProducts } from '../../api/product';
import {
  createEstimate,
  deleteEstimate,
  getEstimates,
  updateEstimate,
} from '../../api/estimate';
import EstimatesTable from './EstimatesTable';

interface Props {}

function Estimates(props: Props) {
  const [user, setUser] = useUserContext();
  const [customers, setCustomers] = React.useState<{}[]>();
  const [estimates, setEstimates] = React.useState<{}[]>([]);
  const [message, setMessage] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<{}[]>();
  const [total, setTotal] = React.useState<Number>(0);
  const [values, setValues] = React.useState<{
    customer: string;
    products: { product: string; amount: number }[];
  }>({
    customer: '',
    products: [],
  });
  const onChange = (str: string, e: any, index: number) => {
    switch (str) {
      case 'customer':
        setValues({ ...values, customer: e });
        break;
      case 'products':
        var v = [...values.products];
        v[index] = { ...values.products[index], product: e };
        setValues({ ...values, products: v });
        break;
      case 'amount':
        var v = [...values.products];
        v[index] = { ...values.products[index], amount: e };
        setValues({ ...values, products: v });
        break;
      default:
        break;
    }
  };
  const getData = async () => {
    try {
      const c = await getCustomers(user.user.organizationId);
      const w = await getEstimates(user.user.organizationId);
      const p = await getProducts(user.user.organizationId);
      setCustomers(c.data);
      setProducts(p.data);
      setEstimates(w.data);
    } catch (err) {
      console.log(err);
    }
  };
  const updateData = async () => {
    try {
      const d = {
        ...values,
        organizationId: user.user.organizationId,
        updatedBy: user.user._id,
      };
      const data = await updateEstimate(d);
      if (data.status == 200) {
        setMessage(data.data);
        setShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createData = async () => {
    var v = {
      ...values,
      organizationId: user.user.organizationId,
      createdBy: user.user._id,
    };
    try {
      const res = await createEstimate(v);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteData = async (r: string) => {
    try {
      const res = await deleteEstimate(r);
      if (res.status == 200) {
        setMessage(res.data);
        setShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getData();
  }, [user, show]);
  return (
    <Box
      component='span'
      m={8}
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection={'column'}
      gap={'16px'}
    >
      <Snackbar
        open={show}
        autoHideDuration={3000}
        onClose={() => setShow(false)}
        message={message}
      />
      Total Number of Estimates: {estimates.length}
      <EstimatesDrawer
        customers={customers}
        products={products}
        onChange={onChange}
        onClickSubmit={!isEdit ? createData : updateData}
        setOpen={setOpen}
        open={open}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        setValues={setValues}
        values={values}
        total={total}
      />
      <EstimatesTable
        columns={[
          'Customer',
          'Products - Amount',
          'Created At',
          'Delete',
          'Edit',
        ]}
        rows={estimates}
        open={open}
        setOpen={setOpen}
        setValues={setValues}
        setIsEdit={setIsEdit}
        deleteData={deleteData}
      />
    </Box>
  );
}

export default Estimates;
