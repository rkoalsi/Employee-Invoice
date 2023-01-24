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
import { ESTIMATE_VERIFICATION_SCHEMA } from '../../helpers/validators';

interface Props {}

function Estimates(props: Props) {
  const [user, setUser] = useUserContext();
  const [customers, setCustomers] = React.useState<{}[]>();
  const [estimates, setEstimates] = React.useState<{}[]>([]);
  const [message, setMessage] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [checker, setChecker] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<any[]>([{}]);
  const [values, setValues] = React.useState<{
    customer: string;
    products: { product: string | { price: number }; amount: number }[];
    total: number;
  }>({
    customer: '',
    products: [],
    total: 0,
  });

  const onChange = (str: string, e: any, index: number) => {
    setChecker(!checker);
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
  React.useEffect(() => {
    const w = [...values.products];
    const total = w
      .map((p: any) => {
        if (p.product && !isNaN(p.product.price)) {
          return p.product.price * p.amount;
        } else {
          const index = products.findIndex(function (pr: any) {
            return pr._id == p.product;
          });
          if (products[index]?.price && p.amount > 0) {
            return products[index].price * p.amount;
          } else {
            return 0;
          }
        }
      })
      .reduce((x, y) => x + y, 0);
    setValues({ ...values, total });
  }, [open, checker]);

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
      const check = await ESTIMATE_VERIFICATION_SCHEMA.validate(values, {
        abortEarly: false,
      });
      if (check) {
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
      }
    } catch (error: any) {
      if (error.inner) {
        error.inner.forEach((e: any) => {
          setMessage(e.message);
          setShow(true);
        });
      } else {
        console.log(error);
      }
    }
  };
  const createData = async () => {
    try {
      const check = await ESTIMATE_VERIFICATION_SCHEMA.validate(values, {
        abortEarly: false,
      });
      if (check) {
        var v = {
          ...values,
          organizationId: user.user.organizationId,
          createdBy: user.user._id,
        };
        console.log(v);
        const res = await createEstimate(v);
        if (res.status == 200) {
          setMessage('Successfully Created Estimate');
          setShow(true);
        }
      }
    } catch (error: any) {
      if (error.inner) {
        error.inner.forEach((e: any) => {
          setMessage(e.message);
          setShow(true);
        });
      } else {
        console.log(error.message);
      }
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
      />
      <EstimatesTable
        columns={[
          'Customer',
          'Products - Amount',
          'Total',
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
