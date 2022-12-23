import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

interface Props {
  error?: any;
}

function Toast(props: Props) {
  const { error } = props;
  const [open, setOpen] = React.useState<boolean>(true);

  return (
    <>
      {error.status && (
        <Collapse in={open}>
          <Alert
            severity='error'
            color='error'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            {error.message}
          </Alert>
        </Collapse>
      )}
    </>
  );
}

export default Toast;
