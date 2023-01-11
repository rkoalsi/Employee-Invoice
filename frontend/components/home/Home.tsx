import React from 'react';
import { useUserContext } from '../../context/user';
import Router, { useRouter } from 'next/router';
import { Button, Box, Grid } from '@mui/material';
import Card from '../common/Card';
import { getCustomers } from '../../api/customer';
import axios from 'axios';
import { getInvoices } from '../../api/invoice';
import { getProducts } from '../../api/product';
import { getEstimates } from '../../api/estimate';
import { getSalesOrders } from '../../api/salesOrder';
interface Props {}

function Home(props: Props) {
  const {} = props;
  const router = useRouter();
  const [user, setUser] = useUserContext();
  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      const res = await axios.all([
        getCustomers(user.user.organizationId),
        getProducts(user.user.organizationId),
        getEstimates(user.user.organizationId),
        getSalesOrders(user.user.organizationId),
        getInvoices(user.user.organizationId),
      ]);
      setData([
        res[0].data,
        res[1].data,
        res[2].data,
        res[3].data,
        res[4].data,
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getData();
  }, [user]);
  const onClickSignOut = () => {
    setUser({});
    Router.push('/login');
  };

  if (user && user.token) {
    return (
      <Box
        component='span'
        m={8}
        gap={'8px'}
        display='flex'
        flexDirection={'column'}
        justifyContent='center'
        alignItems='center'
      >
        Welcome {user.user.name}. You are an {user.user.role}
        <br /> <br />
        <Grid m={2} container spacing={1} direction={'column'}>
          <Grid item>
            <Card onClick={() => router.push('/customers')}>
              Total number of Customers: {data[0]?.length}
            </Card>
          </Grid>
          <Grid item>
            <Card onClick={() => router.push('/products')}>
              Total number of Products: {data[1]?.length}
            </Card>
          </Grid>
          <Grid item>
            <Card onClick={() => router.push('/estimates')}>
              Total number of Estimates: {data[2]?.length}
            </Card>
          </Grid>
          <Grid item>
            <Card onClick={() => router.push('/sales-orders')}>
              Total number of Sales Orders: {data[3]?.length}
            </Card>
          </Grid>
          <Grid item>
            <Card onClick={() => router.push('/invoices')}>
              Total number of Invoices: {data[4]?.length}
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box
      m={8}
      gap={'16px'}
      display='flex'
      flexDirection={'column'}
      alignItems='center'
    >
      <div>You are not logged in</div>
      <Button variant={'outlined'} onClick={onClickSignOut}>
        Log In
      </Button>
    </Box>
  );
}

export default Home;
