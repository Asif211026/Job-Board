import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${searchQuery}`);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
          color: 'white',
          py: 10,
          borderRadius: 0,
          mb: 6
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Find Your Dream Job
          </Typography>
          <Typography variant="h6" paragraph>
            Connect with the best companies and opportunities worldwide
          </Typography>

          <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{
              p: 1,
              display: 'flex',
              maxWidth: 700,
              mt: 4,
              borderRadius: 2
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search jobs by title, keyword, or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{ sx: { borderRadius: 2, border: 'none' } }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ ml: 1, px: 4, borderRadius: 2 }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Why Choose Our Job Board
        </Typography>
        <Typography variant="body1" paragraph textAlign="center" sx={{ mb: 6 }}>
          We connect the right candidates with the right opportunities
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <WorkIcon fontSize="large" color="primary" />
              </Box>
              <Typography variant="h6" gutterBottom>
                For Job Seekers
              </Typography>
              <Typography variant="body2">
                Access thousands of jobs across all industries and levels. Apply easily and track your applications.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <BusinessIcon fontSize="large" color="primary" />
              </Box>
              <Typography variant="h6" gutterBottom>
                For Employers
              </Typography>
              <Typography variant="body2">
                Post jobs, manage applications, and find the perfect candidates for your open positions.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <PersonIcon fontSize="large" color="primary" />
              </Box>
              <Typography variant="h6" gutterBottom>
                Advanced Matching
              </Typography>
              <Typography variant="body2">
                Our intelligent matching algorithm connects the right talent with the right opportunities.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          py: 6,
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Join thousands of job seekers and employers who trust our platform
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/register?type=jobseeker')}
            >
              I'm Looking for a Job
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/register?type=employer')}
            >
              I'm Hiring
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 