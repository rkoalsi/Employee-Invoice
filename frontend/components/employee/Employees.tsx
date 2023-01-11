import React from 'react';
import { useUserContext } from '../../context/user';
import { Box } from '@mui/material';
import BasicTable from '../common/Table';
import EmployeesDrawer from './EmployeesDrawer';

interface Props {}

function Employees(props: Props) {
  const [user, setUser] = useUserContext();
  return (
    <Box
      component='span'
      m={8}
      display='flex'
      flexDirection={'column'}
      justifyContent='center'
      alignItems='center'
    >
      Total Number of Employees: {user?.user?.employees.length}
      <EmployeesDrawer />
    </Box>
  );
}

export default Employees;
