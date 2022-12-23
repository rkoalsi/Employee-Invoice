import React from 'react';
import TextField from '@mui/material/TextField';

function Input(props: any) {
  const { ...rest } = props;

  return (
    <TextField
      {...rest}
      sx={{ input: { color: 'black', backgroundColor: 'white' } }}
    />
  );
}

export default Input;
