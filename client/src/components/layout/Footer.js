import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  useTheme
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WorkIcon from '@mui/icons-material/Work';

const Footer = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.100',
        py: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WorkIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h6" color="primary" fontWeight="bold">
                JobBoard
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Connecting top talent with the best employers. Find your dream job or the perfect candidate.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="facebook" size="small">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="twitter" size="small">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="linkedin" size="small">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="primary" aria-label="instagram" size="small">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              For Job Seekers
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/jobs" color="inherit" underline="hover">
                  Browse Jobs
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/applications" color="inherit" underline="hover">
                  Applications
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/profile" color="inherit" underline="hover">
                  My Profile
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="#" color="inherit" underline="hover">
                  Career Resources
                </Link>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              For Employers
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/post-job" color="inherit" underline="hover">
                  Post a Job
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="#" color="inherit" underline="hover">
                  Hiring Solutions
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="#" color="inherit" underline="hover">
                  Pricing
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="#" color="inherit" underline="hover">
                  Partner With Us
                </Link>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Company
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="#" color="inherit" underline="hover">
                  About Us
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="#" color="inherit" underline="hover">
                  Contact
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="#" color="inherit" underline="hover">
                  Privacy Policy
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="#" color="inherit" underline="hover">
                  Terms of Service
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {year} JobBoard. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Privacy
              </Typography>
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Terms
              </Typography>
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Cookies
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 