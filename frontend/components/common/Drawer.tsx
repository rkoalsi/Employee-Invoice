import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import styled from 'styled-components';
import { Button, Box } from '@mui/material';

export default function BDrawer(props: any) {
  const { open, setOpen, setValues, setIsEdit } = props;
  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };
  return (
    <Container>
      <React.Fragment key={'right'}>
        <Button
          onClick={() => {
            toggleDrawer(true);
            setIsEdit(false);
            setValues({ name: '', shop: '', gstin: '', phone: '' });
          }}
        >
          {props.buttonText}
        </Button>
        <Drawer
          anchor={'right'}
          open={open}
          onClose={() => toggleDrawer(false)}
        >
          {props.children}
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'16px'}
          >
            <Button
              variant={'outlined'}
              color={'error'}
              onClick={() => toggleDrawer(false)}
            >
              Cancel
            </Button>
            <Button
              variant={'outlined'}
              onClick={() => {
                toggleDrawer(false);
                props.onClickSubmit();
              }}
            >
              Submit
            </Button>
          </Box>
        </Drawer>
      </React.Fragment>
    </Container>
  );
}

const Container = styled.div`
  padding: 8px;
  position: absolute;
  top: 0;
  right: 0;
`;
