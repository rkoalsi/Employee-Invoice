import React from 'react';
import { useUserContext } from '../../context/user';
import Router, { useRouter } from 'next/router';
import { Button, Box, Grid, Typography } from '@mui/material';
import { getCustomers, getCustomersData } from '../../api/customer';
import axios from 'axios';
import { getInvoices, getInvoicesData } from '../../api/invoice';
import { getProducts, getProductsData } from '../../api/product';
import { getEstimates, getEstimatesData } from '../../api/estimate';
import { getSalesOrders, getSalesOrdersData } from '../../api/salesOrder';
import DashCard from '../common/DashboardCard';
import {
  ArticleOutlined,
  GroupOutlined,
  Inventory2Outlined,
  RequestPageOutlined,
  ShoppingBasketOutlined,
} from '@mui/icons-material';
import { getEmployeesData, getEmployees } from '../../api/employee';
import LineChart from '../common/LineChart';
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
        getEmployees(user.user.organizationId),
        getEmployeesData(user.user.organizationId),
        getCustomersData(user.user.organizationId),
        getInvoicesData(user.user.organizationId),
        getProductsData(user.user.organizationId),
        getEstimatesData(user.user.organizationId),
        getSalesOrdersData(user.user.organizationId),
      ]);
      setData([
        res[0].data,
        res[1].data,
        res[2].data,
        res[3].data,
        res[4].data,
        res[5].data.filter((e: any) => e.role === 'employee'),
        res[5].data.filter((e: any) => e.role === 'admin'),
        res[6].data,
        res[7].data,
        res[8].data,
        res[9].data,
        res[10].data,
        res[11].data,
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getData();
    console.log(user);
  }, [user]);
  const onClickSignOut = () => {
    setUser({});
    Router.push('/login');
  };
  const onClickHome = () => {
    Router.push('/');
  };

  if (user && user.token && user.user.role === ('admin' || 'employee')) {
    return (
      <Box
        component='span'
        m={8}
        gap={'2px'}
        display='flex'
        flexDirection={'column'}
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant={'h2'}>
          Welcome {user.user.name[0].toUpperCase() + user.user.name.slice(1)}.
        </Typography>
        <br />
        <Typography variant={'h3'}>
          You are an {user.user.role[0].toUpperCase() + user.user.role.slice(1)}
        </Typography>
        <br /> <br />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Grid item>
            <DashCard
              icon={<GroupOutlined />}
              text={`Total Customers: ${data[0]?.length}`}
              graph={<LineChart data={data[8]} title={'Customers Growth'} />}
              onClick={() => router.push('/customers')}
            />
          </Grid>
          {user.user.role === 'admin' && (
            <>
              <Grid item>
                <DashCard
                  icon={<GroupOutlined />}
                  text={`Total Employees: ${data[5]?.length}`}
                  graph={
                    <LineChart data={data[7]} title={'Employees Growth'} />
                  }
                  onClick={() => router.push('/employees')}
                />
              </Grid>
            </>
          )}
          <Grid item>
            <DashCard
              icon={<ShoppingBasketOutlined />}
              text={`Total Products: ${data[1]?.length}`}
              graph={<LineChart data={data[10]} title={'Products Growth'} />}
              onClick={() => router.push('/products')}
            />
          </Grid>
          <Grid item>
            <DashCard
              icon={<ArticleOutlined />}
              text={`Total Estimates: ${data[2]?.length}`}
              graph={<LineChart data={data[11]} title={'Estimates Growth'} />}
              onClick={() => router.push('/estimates')}
            />
          </Grid>
          <Grid item>
            <DashCard
              icon={<Inventory2Outlined />}
              text={`Total Sales Orders: ${data[3]?.length}`}
              graph={
                <LineChart data={data[12]} title={'Sales Orders Growth'} />
              }
              onClick={() => router.push('/sales-orders')}
            />
          </Grid>
          <Grid item>
            <DashCard
              icon={<RequestPageOutlined />}
              text={`Total Invoices: ${data[4]?.length}`}
              graph={<LineChart data={data[9]} title={'Invoices Growth'} />}
              onClick={() => router.push('/invoices')}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
  if (user?.user?.role === 'customer') {
    return (
      <Box
        component='span'
        m={8}
        gap={'2px'}
        display='flex'
        flexDirection={'column'}
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant={'h2'}>
          Welcome {user.user.name[0].toUpperCase() + user.user.name.slice(1)}.
        </Typography>
        <br />
        <Typography variant={'h3'}>
          You are a {user.user.role[0].toUpperCase() + user.user.role.slice(1)}
        </Typography>
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
      <Button variant={'outlined'} onClick={onClickHome}>
        Go to Home
      </Button>
    </Box>
  );
}
export default Home;
