import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useUserContext } from '../../context/user';
import { Button } from '@mui/material';
import {
  ArticleOutlined,
  CorporateFareOutlined,
  GroupOutlined,
  Home,
  Inventory2Outlined,
  PeopleOutline,
  Person2Outlined,
  RequestPageOutlined,
  ShoppingBasketOutlined,
} from '@mui/icons-material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const NAVIGATION = {
  customer: [{ label: 'Home', value: '/', icon: <Home /> }],
  employee: [
    { label: 'Home', value: '/', icon: <Home /> },
    { label: 'Customers', value: 'customers', icon: <GroupOutlined /> },
    { label: 'Products', value: 'products', icon: <ShoppingBasketOutlined /> },
    { label: 'Estimates', value: 'estimates', icon: <ArticleOutlined /> },
    {
      label: 'Sales Orders',
      value: 'sales-orders',
      icon: <Inventory2Outlined />,
    },
    { label: 'Invoices', value: 'invoices', icon: <RequestPageOutlined /> },
  ],
  admin: [
    { label: 'Home', value: '/', icon: <Home /> },
    { label: 'Employees', value: 'employees', icon: <PeopleOutline /> },
    {
      label: 'Organization',
      value: 'organization',
      icon: <CorporateFareOutlined />,
    },
    { label: 'Customers', value: 'customers', icon: <GroupOutlined /> },
    { label: 'Products', value: 'products', icon: <ShoppingBasketOutlined /> },
    { label: 'Estimates', value: 'estimates', icon: <ArticleOutlined /> },
    {
      label: 'Sales Orders',
      value: 'sales-orders',
      icon: <Inventory2Outlined />,
    },
    { label: 'Invoices', value: 'invoices', icon: <RequestPageOutlined /> },
  ],
};

export default function Sidebar() {
  const [user, setUser] = useUserContext();
  const router = useRouter();
  const onClickSignOut = () => {
    setUser({});
    router.push('/login');
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {NAVIGATION[user.user.role].map(
          (
            text: {
              value: string;
              label: string;
              icon: React.Component;
            },
            index: number
          ) => (
            <ListItem key={text.value} disablePadding>
              <ListItemButton onClick={() => router.push(text.value)}>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.label} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <Container>
      <React.Fragment key={'left'}>
        <MenuIcon onClick={toggleDrawer('left', true)} />
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
          <Box
            bottom={0}
            component='span'
            m={1}
            gap={'8px'}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Button
              variant='contained'
              color='primary'
              sx={{ height: 40 }}
              onClick={onClickSignOut}
            >
              Sign Out
            </Button>
          </Box>
        </Drawer>
      </React.Fragment>
    </Container>
  );
}

const Container = styled.div`
  padding: 8px;
  position: absolute;
  top: 0;
  left: 0;
`;
