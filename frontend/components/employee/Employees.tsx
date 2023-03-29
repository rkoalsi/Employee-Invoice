import React from 'react';
import { useUserContext } from '../../context/user';
import { Box, Snackbar, Switch } from '@mui/material';
import EmployeesDrawer from './EmployeesDrawer';
import EmployeeTable from './EmployeeTable';
import { EMPLOYEE_VERIFICATION_SCHEMA } from '../../helpers/validators';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../api/employee';
import { TypographyH2 } from '../common/Typography';

interface Props {}

function Employees(props: Props) {
  const [user, setUser] = useUserContext();
  const [employees, setEmployees] = React.useState<[]>([]);
  const [admins, setAdmins] = React.useState<[]>([]);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [values, setValues] = React.useState({
    name: '',
    role: '',
    email: '',
  });
  const getData = async () => {
    try {
      const res = await getEmployees(user?.user?.organizationId);
      if (res.status == 200) {
        setAdmins(res.data.filter((d: any) => d.role === 'admin'));
        setEmployees(res.data.filter((d: any) => d.role === 'employee'));
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getData();
  }, [user, show]);
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
  const createData = async () => {
    try {
      const check = await EMPLOYEE_VERIFICATION_SCHEMA.validate(values, {
        abortEarly: false,
      });
      if (check) {
        console.log(values);
        const d = {
          ...values,
          designation:
            values.role.charAt(0).toUpperCase() + values.role.slice(1),
          organizationId: user.user.organizationId,
        };
        const res = await createEmployee(d);
        if (res.status == 200) {
          setMessage(
            `Successfully Created ${
              res.data.user.role.charAt(0).toUpperCase() +
              res.data.user.role.slice(1)
            }, Password is ${res.data.password} `
          );
          setShow(true);
          setOpen(false);
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  const onClickDelete = async (r: { _id: string }) => {
    try {
      const res = await deleteEmployee(r);
      if (res.status == 200) {
        setMessage(`Successfully Deleted Employee`);
        setShow(true);
        setOpen(false);
        console.log(res.data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  const updateData = async () => {
    try {
      const check = await EMPLOYEE_VERIFICATION_SCHEMA.validate(values, {
        abortEarly: false,
      });
      if (check) {
        const res = await updateEmployee(values);
        if (res.status == 200) {
          setMessage(res.data);
          setShow(true);
          setOpen(false);
        }
      }
    } catch (err: any) {
      console.log(err);
    }
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
      <Snackbar
        open={show}
        autoHideDuration={3000}
        onClose={() => setShow(false)}
        message={message}
      />
      <TypographyH2>
        Total Number of {checked ? `Admins` : `Employees`}:{' '}
        {checked ? admins.length : employees.length}
      </TypographyH2>
      <Box>
        {'\t Employees'}{' '}
        <Switch
          defaultChecked={checked}
          onChange={() => setChecked(!checked)}
        />
        {'\t Admins'}
      </Box>
      <EmployeesDrawer
        onChange={onChange}
        onClickSubmit={!isEdit ? createData : updateData}
        setOpen={setOpen}
        open={open}
        setValues={setValues}
        setIsEdit={setIsEdit}
        values={values}
      />
      <EmployeeTable
        onClickDelete={onClickDelete}
        user={user}
        rows={checked ? admins : employees}
        setOpen={setOpen}
        setValues={setValues}
        setIsEdit={setIsEdit}
        columns={['Name', 'Role', 'Email', 'Delete', 'Edit']}
      />
    </Box>
  );
}

export default Employees;
