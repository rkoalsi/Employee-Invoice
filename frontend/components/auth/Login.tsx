import React from 'react';
import Input from '../common/Input';
import Column from '../common/Column';
import Label from '../common/Label';
import Button from '../common/Button';
import Card from '../common/Card';

interface Props {}

function Login(props: Props) {
  const {} = props;

  return (
    <Card>
      <Column gap={'16px'}>
        <Column gap={'8px'}>
          <Label>Email</Label>
          <Input name='email' type={'email'} />
        </Column>
        <Column gap={'8px'}>
          <Label>Password</Label>
          <Input name='password' type={'password'} />
        </Column>
        <Button>Sign In</Button>
      </Column>
    </Card>
  );
}

export default Login;
