import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toast from '../common/Toast';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Router from 'next/router';
import { register } from '../../api/auth';
import Copyright from '../common/Copyright';
import Input from '../common/Input';
import { useUserContext } from '../../context/user';
import DropDown from '../common/DropDown';
import { SIGNUP_VERIFICATION_SCHEMA } from '../../helpers/validators';

interface Props {}
export const ROLES = [
  { value: 'admin', name: 'Admin' },
  { value: 'customer', name: 'Customer' },
  { value: 'employee', name: 'Employee' },
];
function Register(props: Props) {
  const {} = props;
  const [error, setError] = React.useState<any>({ status: false, message: '' });
  const [user, setUser] = useUserContext();
  const [data, setData] = React.useState<any>({
    name: '',
    organizationId: '',
    designation: '',
    email: '',
    password: '',
  });

  const onClickRegister = async () => {
    try {
      const check = await SIGNUP_VERIFICATION_SCHEMA.validate(data, {
        abortEarly: false,
      });
      if (check) {
        try {
          const w = await register(data);
          if (w.data.errors) {
            setError({ status: true, message: w.data.message });
          } else {
            setError({ status: 'success', message: 'Successfully Logged In' });
            setUser(w.data);
            Router.push('/dashboard');
          }
        } catch (error: any) {
          console.log(error.response.data);
        }
      }
    } catch (err: any) {
      err.inner.forEach((e: any) => {
        setError({ status: true, message: e.message });
      });
    }
  };

  const onChange = (cond: string, str: string) => {
    switch (cond) {
      case 'email':
        setData({ ...data, email: str });
        break;
      case 'password':
        setData({ ...data, password: str });
        break;
      case 'designation':
        setData({ ...data, designation: str });
        break;
      case 'name':
        setData({ ...data, name: str });
        break;
      case 'organizationId':
        setData({ ...data, organizationId: str });
        break;
      default:
        break;
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Toast error={error} />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' color={'black'}>
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }} color={'black'}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                onChange={(e: any) => onChange('name', e.target.value)}
                autoComplete='given-name'
                name='name'
                required
                fullWidth
                id='name'
                label='Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                onChange={(e: any) => onChange('email', e.target.value)}
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                onChange={(e: any) => onChange('password', e.target.value)}
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                onChange={(e: any) =>
                  onChange('organizationId', e.target.value)
                }
                required
                fullWidth
                name='organizationId'
                label='Organization Id'
                type='organizationId'
                id='organizationId'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <DropDown
                items={ROLES}
                label={'Designation'}
                onChangeTitle={'designation'}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            onClick={onClickRegister}
            fullWidth
            id={'register'}
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default Register;
