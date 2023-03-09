import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';
import styled from 'styled-components';

export default function DashCard(props: any) {
  return (
    <Card sx={{ width: 'max-content', boxShadow: '8px' }}>
      <CardContent>
        <Div>
          <Icon>{props.icon}</Icon>
          <Typography variant='h5'>{props.text}</Typography>
        </Div>
        {props.graph}
      </CardContent>
      <CardActions>
        <Button size='small' fullWidth onClick={() => props.onClick()}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: max-content;
  padding: 4px;
`;
