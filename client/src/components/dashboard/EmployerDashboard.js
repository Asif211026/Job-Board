import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  LinearProgress,
  Link
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getJobs, deleteJob } from '../../actions/jobActions';

// Mock data - would be replaced with actual API data
const mockApplicationStats = {
  total: 48,
  pending: 22,
  reviewed: 15,
  interviewed: 8,
  offered: 3,
  rejected: 0
};

const EmployerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { jobs, loading } = useSelector(state => state.jobs);
  
  const [jobMenuAnchorEl, setJobMenuAnchorEl] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  
  useEffect(() => {
    dispatch(getJobs({ employer: user?.id }));
  }, [dispatch, user]);
  
  // Job action menu handlers
  const handleJobMenuOpen = (event, jobId) => {
    setJobMenuAnchorEl(event.currentTarget);
    setSelectedJobId(jobId);
  };
  
  const handleJobMenuClose = () => {
    setJobMenuAnchorEl(null);
    setSelectedJobId(null);
  };
  
  const handleEditJob = () => {
    // Navigate to edit job page
    handleJobMenuClose();
  };
  
  const handleDeleteJob = () => {
    if (selectedJobId) {
      dispatch(deleteJob(selectedJobId));
    }
    handleJobMenuClose();
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Get application stats for a job
  const getJobApplicationStats = (jobId) => {
    // In a real app, this would fetch actual data
    return {
      total: Math.floor(Math.random() * 20),
      new: Math.floor(Math.random() * 10)
    };
  };
  
  // Calculate job posting metrics
  const getMetrics = () => {
    const activeJobs = jobs.filter(job => new Date(job.applicationDeadline) > new Date()).length;
    const expiredJobs = jobs.length - activeJobs;
    const totalApplications = jobs.reduce((total, job) => total + getJobApplicationStats(job.id).total, 0);
    const newApplications = jobs.reduce((total, job) => total + getJobApplicationStats(job.id).new, 0);
    
    return {
      totalJobs: jobs.length,
      activeJobs,
      expiredJobs,
      totalApplications,
      newApplications
    };
  };
  
  const metrics = getMetrics();
  
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Calculate days left until deadline
  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft;
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          {user?.company || 'Company'} Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your job postings and applicants
        </Typography>
      </Box>
      
      {/* Dashboard Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <WorkIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Posted Jobs
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                {metrics.totalJobs}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {metrics.activeJobs} active, {metrics.expiredJobs} expired
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Applications
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                {metrics.totalApplications}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {metrics.newApplications} new applications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <AssessmentIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  View Rate
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                68%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                12% higher than average
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <BusinessCenterIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Subscription
                </Typography>
              </Box>
              <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                Premium Plan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Renews in 23 days
              </Typography>
              
              {/* Visual indicator for subscription status */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  width: '100%', 
                  height: 4, 
                  bgcolor: 'warning.main' 
                }} 
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Job Management Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Job Postings
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/post-job"
          >
            Post New Job
          </Button>
        </Box>
        
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Active Jobs" />
            <Tab label="Expired Jobs" />
            <Tab label="Draft Jobs" />
          </Tabs>
        </Paper>
        
        {loading ? (
          <LinearProgress sx={{ mb: 4 }} />
        ) : jobs.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No jobs posted yet
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Create your first job posting to start receiving applications
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<AddIcon />}
              component={RouterLink}
              to="/post-job"
              sx={{ mt: 2 }}
            >
              Post New Job
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {jobs.map(job => {
              const appStats = getJobApplicationStats(job.id);
              const daysLeft = calculateDaysLeft(job.applicationDeadline);
              const isExpired = daysLeft <= 0;
              
              // Skip expired jobs if on active tab, and vice versa
              if ((tabValue === 0 && isExpired) || (tabValue === 1 && !isExpired)) {
                return null;
              }
              
              return (
                <Grid item xs={12} key={job.id}>
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={7}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6" component="h3" gutterBottom>
                              {job.title}
                            </Typography>
                            <IconButton
                              aria-label="Job actions"
                              onClick={(e) => handleJobMenuOpen(e, job.id)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </Box>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            <Chip
                              icon={<WorkIcon fontSize="small" />}
                              label={job.type}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              icon={<BusinessCenterIcon fontSize="small" />}
                              label={job.experience || 'Experience: Not specified'}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              label={job.location}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Posted: {formatDate(job.postedDate)} | 
                            Deadline: {formatDate(job.applicationDeadline)}
                            {!isExpired && ` (${daysLeft} days left)`}
                          </Typography>
                          
                          <Typography variant="body2" paragraph sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}>
                            {job.description}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} md={5}>
                          <Paper variant="outlined" sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Applications
                              </Typography>
                              <Typography variant="h6" color="primary">
                                {appStats.total}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={isExpired ? 100 : (daysLeft < 30 ? ((30 - daysLeft) / 30) * 100 : 10)} 
                                  color={isExpired ? "error" : "primary"}
                                  sx={{ height: 8, borderRadius: 4 }}
                                />
                              </Box>
                              <Box sx={{ minWidth: 35 }}>
                                <Typography variant="body2" color="text.secondary">
                                  {isExpired ? 'Closed' : `${daysLeft}d`}
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<VisibilityIcon />}
                                component={RouterLink}
                                to={`/jobs/${job.id}`}
                              >
                                View Job
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                component={RouterLink}
                                to={`/applications/${job.id}`}
                              >
                                View Applications
                              </Button>
                            </Box>
                          </Paper>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
      
      {/* Recent Applications Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
          Recent Applications
        </Typography>
        
        <Paper>
          <List sx={{ width: '100%' }}>
            {mockApplicationStats.total > 0 ? (
              Array(5).fill(0).map((_, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider variant="inset" component="li" />}
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <Box>
                        <Chip 
                          label={['Pending', 'Reviewed', 'Interviewed', 'Offered'][Math.floor(Math.random() * 4)]} 
                          size="small" 
                          color={index % 2 === 0 ? "primary" : "default"}
                        />
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Applicant ${index + 1}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Applied for {['Senior Developer', 'UX Designer', 'Product Manager', 'DevOps Engineer', 'Data Scientist'][index]}
                          </Typography>
                          {" — " + `${Math.floor(Math.random() * 10) + 1} days ago`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText 
                  primary="No applications yet" 
                  secondary="Applications will appear here when job seekers apply to your posted jobs" 
                />
              </ListItem>
            )}
          </List>
          
          <Divider />
          
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Button 
              component={RouterLink} 
              to="/applications" 
              color="primary"
            >
              View All Applications
            </Button>
          </Box>
        </Paper>
      </Box>
      
      {/* Application Stats Section */}
      <Box>
        <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
          Application Stats
        </Typography>
        
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Status Overview
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">Pending</Typography>
                  <Typography variant="body2">{mockApplicationStats.pending}/{mockApplicationStats.total}</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(mockApplicationStats.pending / mockApplicationStats.total) * 100}
                  sx={{ height: 8, borderRadius: 4, mb: 1.5 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">Reviewed</Typography>
                  <Typography variant="body2">{mockApplicationStats.reviewed}/{mockApplicationStats.total}</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(mockApplicationStats.reviewed / mockApplicationStats.total) * 100}
                  color="info"
                  sx={{ height: 8, borderRadius: 4, mb: 1.5 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">Interviewed</Typography>
                  <Typography variant="body2">{mockApplicationStats.interviewed}/{mockApplicationStats.total}</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(mockApplicationStats.interviewed / mockApplicationStats.total) * 100}
                  color="secondary"
                  sx={{ height: 8, borderRadius: 4, mb: 1.5 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">Offered</Typography>
                  <Typography variant="body2">{mockApplicationStats.offered}/{mockApplicationStats.total}</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(mockApplicationStats.offered / mockApplicationStats.total) * 100}
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Top Performing Jobs
              </Typography>
              
              <List>
                {jobs.slice(0, 3).map((job, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: ['primary.main', 'secondary.main', 'error.main'][index] }}>
                        {index + 1}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={job.title}
                      secondary={`${getJobApplicationStats(job.id).total} applications`}
                      primaryTypographyProps={{ variant: 'body1' }}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Improve your job postings:
                </Typography>
                <List dense>
                  <ListItem disableGutters>
                    <ListItemText secondary="Add more detailed job descriptions" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText secondary="Specify salary ranges to attract more candidates" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText secondary="Highlight benefits and company culture" />
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      
      {/* Job Actions Menu */}
      <Menu
        anchorEl={jobMenuAnchorEl}
        open={Boolean(jobMenuAnchorEl)}
        onClose={handleJobMenuClose}
      >
        <MenuItem onClick={handleEditJob}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Job</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteJob}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Job</ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default EmployerDashboard; 