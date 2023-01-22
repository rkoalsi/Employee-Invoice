import React from 'react';
import { useUserContext } from '../../context/user';
import Router, { useRouter } from 'next/router';
import { Button, Box, Grid, Typography } from '@mui/material';
import { getCustomers } from '../../api/customer';
import axios from 'axios';
import { getInvoices } from '../../api/invoice';
import { getProducts } from '../../api/product';
import { getEstimates } from '../../api/estimate';
import { getSalesOrders } from '../../api/salesOrder';
import DashCard from '../common/DashboardCard';
import {
  ArticleOutlined,
  GroupOutlined,
  Inventory2Outlined,
  RequestPageOutlined,
  ShoppingBasketOutlined,
} from '@mui/icons-material';
interface Props {}

function Home(props: Props) {
  const {} = props;
  const router = useRouter();
  const [user, setUser] = useUserContext();
  const [data, setData] = React.useState<[{}][]>([
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
  ]);
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
        <Typography variant={'h2'}>
          Welcome {user.user.name}. You are an {user.user.role}
        </Typography>
        <br /> <br />
        <Grid
          container
          spacing={4}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Grid item>
            <DashCard
              icon={<GroupOutlined />}
              text={`Total Customers: ${data[0]?.length}`}
              onClick={() => router.push('/customers')}
            />
          </Grid>
          <Grid item>
            <DashCard
              icon={<ShoppingBasketOutlined />}
              text={`Total Products: ${data[1]?.length}`}
              onClick={() => router.push('/products')}
            />
          </Grid>
          <Grid item>
            <DashCard
              icon={<ArticleOutlined />}
              text={`Total Estimates: ${data[2]?.length}`}
              onClick={() => router.push('/estimates')}
            />
          </Grid>
          <Grid item>
            <DashCard
              icon={<Inventory2Outlined />}
              text={`Total Sales Orders: ${data[3]?.length}`}
              onClick={() => router.push('/sales-orders')}
            />
          </Grid>
          <Grid item>
            <DashCard
              icon={<RequestPageOutlined />}
              text={`Total Invoices: ${data[4]?.length}`}
              onClick={() => router.push('/invoices')}
            />
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
