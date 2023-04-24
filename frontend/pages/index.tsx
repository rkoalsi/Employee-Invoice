import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import { TypographyH1, TypographyH2 } from '../components/common/Typography';

const LabelWrapper = styled(Box)(
  ({ theme }: any) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }: any) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const JsAvatar = styled(Box)(
  ({ theme }: any) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

  img {
    width: 60%;
    height: 60%;
    display: block;
  }
`
);

const NextJsAvatar = styled(Box)(
  ({ theme }: any) => `
  width: ${theme.spacing(8)};
  height: ${theme.spacing(8)};
  border-radius: ${theme.general.borderRadius};
  background-color: #dfebf6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  return (
    <Container maxWidth='lg' sx={{ textAlign: 'center', marginTop: '24px' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent='center'
        alignItems='center'
        container
      >
        <Grid item md={10} lg={8} mx='auto'>
          <LabelWrapper color='success'>Version 1.0.0</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant='h1'>
            Employee Invoicing
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant='h4'
            color='text.secondary'
            fontWeight='normal'
          >
            An online employee invoicing platform in which in each organization
            will be a company. This desktop application/website will help the
            members of an organization to keep track of their inventory/stock,
            as well as customers, supplier/manufacturers invoice/sales and
            purchase orders. When the order is placed, the invoice gets
            generated and sent to the customer via mail.
          </TypographyH2>
          <Button href='/dashboard' size='large' variant='contained'>
            Visit Dashboard
          </Button>
          <Grid container spacing={3} mt={5}>
            <Grid item md={4}>
              <MuiAvatar>
                <img src='/mui.svg' alt='Material-UI' />
              </MuiAvatar>
              <Typography variant='h4'>
                <Box sx={{ pb: 2 }}>
                  <b>Powered by MUI (Material-UI)</b>
                </Box>
                <Typography component='span' variant='subtitle2'>
                  Material UI is a simple, customizable and comprehensive
                  library of components that features the implementation of
                  Google's Material Design system.
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={4}>
              <NextJsAvatar>
                <img src='/nextjs.svg' alt='NextJS' />
              </NextJsAvatar>
              <Typography variant='h4'>
                <Box sx={{ pb: 2 }}>
                  <b>Built with Next.js</b>
                </Box>
                <Typography component='span' variant='subtitle2'>
                  Next.js is an open-source web development framework created by
                  Vercel providing React-based web applications with server-side
                  rendering and static website generation.
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={4}>
              <JsAvatar>
                <img src='/typescript.svg' alt='Typescript' />
              </JsAvatar>
              <Typography variant='h4'>
                <Box sx={{ pb: 2 }}>
                  <b>Built with Typescript</b>
                </Box>
                <Typography component='span' variant='subtitle2'>
                  Employee Invoicing features a modern technology stack and is
                  built with the help of Typescript along with other languages.
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
