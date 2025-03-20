import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Paper,
  Tab,
  Tabs
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import JobCard from '../components/job/JobCard';
import { getJobs } from '../actions/jobActions';

const SavedJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);
  const { jobs, loading: jobsLoading } = useSelector(state => state.jobs);
  const savedJobIds = useSelector(state => state.job?.savedJobs || []);
  
  const [savedJobs, setSavedJobs] = useState([]);
  const [viewType, setViewType] = useState('active');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);
  
  // Fetch all jobs
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);
  
  // Filter saved jobs from all jobs based on savedJobIds
  useEffect(() => {
    if (jobs.length > 0 && savedJobIds.length > 0) {
      const filtered = jobs.filter(job => savedJobIds.includes(job.id));
      setSavedJobs(filtered);
    } else {
      setSavedJobs([]);
    }
  }, [jobs, savedJobIds]);
  
  // Filter based on view type (active/expired)
  const filteredJobs = viewType === 'active' 
    ? savedJobs.filter(job => new Date(job.applicationDeadline) > new Date())
    : savedJobs.filter(job => new Date(job.applicationDeadline) <= new Date());
  
  const handleChangeViewType = (event, newValue) => {
    setViewType(newValue);
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (authLoading || jobsLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={handleGoBack}
        sx={{ mb: 3 }}
      >
        Back
      </Button>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <BookmarkIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Saved Jobs
        </Typography>
      </Box>
      
      {savedJobs.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            You don't have any saved jobs yet
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Bookmark jobs you're interested in to keep track of them here
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/jobs')}
            sx={{ mt: 2 }}
          >
            Browse Jobs
          </Button>
        </Paper>
      ) : (
        <>
          <Paper sx={{ mb: 4 }}>
            <Tabs
              value={viewType}
              onChange={handleChangeViewType}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Active" value="active" />
              <Tab label="Expired" value="expired" />
            </Tabs>
          </Paper>
          
          {filteredJobs.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                No {viewType === 'active' ? 'active' : 'expired'} saved jobs
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {viewType === 'active' 
                  ? 'You don\'t have any active saved jobs. Jobs with expired deadlines appear in the "Expired" tab.'
                  : 'No expired jobs in your saved list. Active jobs appear in the "Active" tab.'}
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredJobs.map(job => (
                <Grid item xs={12} key={job.id}>
                  <JobCard job={job} variant="default" />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default SavedJobs; 