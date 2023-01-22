import React from 'react';
import { useUserContext } from '../../context/user';
import { Box } from '@mui/material';
import EmployeesDrawer from './EmployeesDrawer';
import { getUserByOrganization } from '../../api/user';
import EmployeeTable from './EmployeeTable';

interface Props {}

function Employees(props: Props) {
  const [user, setUser] = useUserContext();
  const [data, setData] = React.useState<[]>([]);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [values, setValues] = React.useState({
    name: '',
    role: '',
    email: '',
  });
  const getData = async () => {
    try {
      const res = await getUserByOrganization(user?.user?.organizationId);
      if (res.status == 200) {
        setData(res.data.filter((d: any) => d.role === 'employee'));
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getData();
  }, [user]);
  const onChange = (str: string, e: any) => {
    switch (str) {
      case 'name':
        setValues({ ...values, name: e });
        break;
      case 'role':
        setValues({ ...values, role: e });
        break;
      case 'email':
        setValues({ ...values, email: e });
        break;
      default:
        break;
    }
  };
  const onClickSubmit = () => {
    console.log(values);
  };
  return (
    <Box
      component='span'
      m={8}
      gap={'16px'}
      display='flex'
      flexDirection={'column'}
      justifyContent='center'
      alignItems='center'
    >
      Total Number of Employees: {data.length}
      <EmployeesDrawer
        onChange={onChange}
        onClickSubmit={onClickSubmit}
        setOpen={setOpen}
        open={open}
        setValues={setValues}
        setIsEdit={setIsEdit}
        values={values}
      />
      <EmployeeTable
        rows={data}
        setOpen={setOpen}
        setValues={setValues}
        setIsEdit={setIsEdit}
        columns={['Name', 'Role', 'Email', 'Delete', 'Edit']}
      />
    </Box>
  );
}

export default Employees;
