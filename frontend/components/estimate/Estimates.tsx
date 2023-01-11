import React from 'react';
import { useUserContext } from '../../context/user';
import { Box } from '@mui/material';
import EstimatesDrawer from './EstimatesDrawer';
import { getCustomers } from '../../api/customer';
import { getProducts } from '../../api/product';

interface Props {}

function Estimates(props: Props) {
  const [user, setUser] = useUserContext();
  const [customers, setCustomers] = React.useState();
  const [products, setProducts] = React.useState();
  const [values, setValues] = React.useState({ customer: '', products: [] });
  const onChange = (str: string, e: any) => {
    console.log(e);
    switch (str) {
      case 'customer':
        setValues({ ...values, customer: e });
        break;
      case 'products':
        setValues({ ...values, products: [...values.products, e] });
        break;
      default:
        break;
    }
  };
  const getData = async () => {
    try {
      const c = await getCustomers(user.user.organizationId);
      const p = await getProducts(user.user.organizationId);
      setCustomers(c.data);
      setProducts(p.data);
    } catch (err) {
      console.log(err);
    }
  };
  const onClickSubmit = () => {
    console.log(values);
  };
  React.useEffect(() => {
    getData();
  }, [user]);
  return (
    <Box
      component='span'
      m={8}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      Total Number of Estimates: {user?.user?.estimates.length}
      <EstimatesDrawer
        customers={customers}
        products={products}
        onChange={onChange}
        onClickSubmit={onClickSubmit}
      />
    </Box>
  );
}

export default Estimates;
