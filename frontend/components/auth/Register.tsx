import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

interface Props {}

function Register(props: Props) {
  const {} = props;
  const [user, setUser] = useUserContext();
  const [data, setData] = React.useState<any>({
    name: 'Paolo',
    organizationId: '639590dbf80e6413b86ede80',
    designation: 'Employee',
    email: 'rohan@mapout.com',
    password: 'hello1',
  });

  const onClickRegister = async () => {
    try {
      console.log(data);
      const w = await register(data);
      setUser(w.data);
      console.log(w.data);
      if (w.status == 200) Router.push('/');
    } catch (error: any) {
      console.log(error.response.data);
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
                onChange={(e: any) => onChange('designation', e.target.value)}
                required
                fullWidth
                name='designation'
                label='Designation'
                type='designation'
                id='designation'
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
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid>
          </Grid>
          <Button
            onClick={onClickRegister}
            fullWidth
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
