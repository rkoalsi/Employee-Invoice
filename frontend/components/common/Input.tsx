import React from 'react';
import TextField from '@mui/material/TextField';

function Input(props: any) {
  const { ...rest } = props;

  return <TextField {...rest} />;
}

export default Input;
