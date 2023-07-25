import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'primary.light',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}>
      <Container maxWidth='lg'>
        <Grid container direction='column' alignItems='center'>
          <Grid item xs={12}>
            <Typography color='black' variant='h5' align='center'>
              Welcome to VIO - Your Ultimate YouTube Companion!
            </Typography>
            <Typography color='black' variant='body1' align='center'>
              VIO allows users to enjoy embedded YouTube videos that are enabled
              and legal, exclusively for educational purposes. This progressive
              web app (PWA) provides seamless offline access, so you can stay
              connected even without an internet connection.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color='textSecondary' variant='subtitle1'>
              &copy; {new Date().getFullYear()} | Alwaz Shahid | Built with
              Material UI | Powered by React Router | Utilizing Rapid API |
              Enhanced with Offline DB
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
