import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import Router from 'next/router';
import { useUserContext } from '../../context/user';
import {
  ArticleOutlined,
  CorporateFareOutlined,
  Dashboard,
  GroupOutlined,
  Home,
  Inventory2Outlined,
  PeopleOutline,
  RequestPageOutlined,
  ShoppingBasketOutlined,
} from '@mui/icons-material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
interface NavigationProps<T> {
  [customer: string]: SubNavigationProps[];
  employee: SubNavigationProps[];
  admin: SubNavigationProps[];
}
interface SubNavigationProps {
  label: string;
  value: string;
  icon: React.ReactComponentElement<any, any>;
}

export default function Sidebar() {
  const [user, setUser] = useUserContext();
  const NAVIGATION: NavigationProps<string> = {
    customer: [
      { label: 'Home', value: '/', icon: <Home /> },
      {
        label: 'Organization',
        value: `/${user?.user?.organizationId}`,
        icon: <CorporateFareOutlined />,
      },
    ],
    employee: [
      { label: 'Home', value: '/', icon: <Home /> },
      { label: 'Dashboard', value: '/dashboard', icon: <Dashboard /> },
      { label: 'Customers', value: '/customers', icon: <GroupOutlined /> },
      {
        label: 'Products',
        value: '/products',
        icon: <ShoppingBasketOutlined />,
      },
      { label: 'Estimates', value: '/estimates', icon: <ArticleOutlined /> },
      {
        label: 'Sales Orders',
        value: '/sales-orders',
        icon: <Inventory2Outlined />,
      },
      { label: 'Invoices', value: '/invoices', icon: <RequestPageOutlined /> },
    ],
    admin: [
      { label: 'Home', value: '/', icon: <Home /> },
      { label: 'Dashboard', value: '/dashboard', icon: <Dashboard /> },
      { label: 'Employees', value: '/employees', icon: <PeopleOutline /> },
      {
        label: 'Organization',
        value: `/${user?.user?.organizationId}`,
        icon: <CorporateFareOutlined />,
      },
      { label: 'Customers', value: '/customers', icon: <GroupOutlined /> },
      {
        label: 'Products',
        value: '/products',
        icon: <ShoppingBasketOutlined />,
      },
      { label: 'Estimates', value: '/estimates', icon: <ArticleOutlined /> },
      {
        label: 'Sales Orders',
        value: '/sales-orders',
        icon: <Inventory2Outlined />,
      },
      { label: 'Invoices', value: '/invoices', icon: <RequestPageOutlined /> },
    ],
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
              icon: React.ReactNode;
            },
            index: number
          ) => (
            <ListItem key={text.value} disablePadding>
              <ListItemButton onClick={() => Router.push(text.value)}>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.label} color={'black'} />
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
        <MenuIcon
          fontSize={'large'}
          onClick={toggleDrawer('left', true)}
          sx={{
            animation: 'spin 3s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'left(-100)',
              },
              '100%': {
                transform: 'rotate(0deg)',
              },
            },
          }}
        />
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
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
