import { Typography, styled } from '@mui/material';
export const TypographyH1 = styled(Typography)(
  ({ theme }: any) => `
      font-size: ${theme.typography.pxToRem(50)};
  `
);

export const TypographyH2 = styled(Typography)(
  ({ theme }: any) => `
      font-size: ${theme.typography.pxToRem(17)};
  `
);
