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
  Link,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';
import { getApplications, updateApplicationStatus } from '../../actions/applicationActions';
import { getSavedJobs } from '../../actions/jobActions';

// Mock data - would be replaced with actual API data
const mockStats = {
  totalApplications: 12,
  pending: 5,
  reviewed: 3,
  interviewed: 2,
  offered: 1,
  rejected: 1,
  savedJobs: 8,
  profileCompletion: 85,
  matchScore: 92
};

const JobSeekerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { applications, loading: applicationsLoading } = useSelector(state => state.applications);
  const { savedJobs, loading: savedJobsLoading } = useSelector(state => state.jobs);
  
  const [tabValue, setTabValue] = useState(0);
  const [applicationMenuAnchorEl, setApplicationMenuAnchorEl] = useState(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  
  useEffect(() => {
    dispatch(getApplications());
    dispatch(getSavedJobs());
  }, [dispatch]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleApplicationMenuOpen = (event, applicationId) => {
    setApplicationMenuAnchorEl(event.currentTarget);
    setSelectedApplicationId(applicationId);
  };
  
  const handleApplicationMenuClose = () => {
    setApplicationMenuAnchorEl(null);
    setSelectedApplicationId(null);
  };
  
  const handleUpdateStatus = (status) => {
    if (selectedApplicationId) {
      dispatch(updateApplicationStatus(selectedApplicationId, status));
    }
    handleApplicationMenuClose();
  };
  
  const handleRatingDialogOpen = () => {
    setRatingDialogOpen(true);
    handleApplicationMenuClose();
  };
  
  const handleRatingDialogClose = () => {
    setRatingDialogOpen(false);
    setRating(0);
    setRatingComment('');
  };
  
  const handleSubmitRating = () => {
    // In a real app, this would dispatch an action to update the rating
    handleRatingDialogClose();
  };
  
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      pending: 'default',
      reviewed: 'info',
      interviewed: 'secondary',
      offered: 'success',
      rejected: 'error'
    };
    return colors[status] || 'default';
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Welcome back, {user?.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Track your job search progress and manage applications
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
                  Applications
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                {mockStats.totalApplications}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {mockStats.pending} pending, {mockStats.offered} offered
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <BookmarkIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Saved Jobs
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                {mockStats.savedJobs}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {mockStats.savedJobs} jobs saved
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
                  Profile Match
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                {mockStats.matchScore}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Based on your skills and preferences
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <PersonIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Profile Completion
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                {mockStats.profileCompletion}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Complete your profile to improve matches
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Main Content Section */}
      <Box sx={{ mb: 4 }}>
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Applications" />
            <Tab label="Saved Jobs" />
            <Tab label="Recommended Jobs" />
          </Tabs>
        </Paper>
        
        {applicationsLoading ? (
          <LinearProgress sx={{ mb: 4 }} />
        ) : tabValue === 0 ? (
          <Paper>
            <List sx={{ width: '100%' }}>
              {applications.length > 0 ? (
                applications.map((application, index) => (
                  <React.Fragment key={application.id}>
                    {index > 0 && <Divider variant="inset" component="li" />}
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <Box>
                          <IconButton
                            edge="end"
                            aria-label="Application actions"
                            onClick={(e) => handleApplicationMenuOpen(e, application.id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Chip 
                            label={application.status}
                            size="small" 
                            color={getStatusColor(application.status)}
                          />
                        </Box>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <BusinessCenterIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={application.job.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {application.job.company}
                            </Typography>
                            {" — " + `Applied ${formatDate(application.appliedDate)}`}
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
                    secondary="Start applying to jobs to track your progress here" 
                  />
                </ListItem>
              )}
            </List>
            
            <Divider />
            
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
              <Button 
                component={RouterLink} 
                to="/jobs" 
                color="primary"
                startIcon={<SearchIcon />}
              >
                Browse Jobs
              </Button>
            </Box>
          </Paper>
        ) : tabValue === 1 ? (
          <Paper>
            <List sx={{ width: '100%' }}>
              {savedJobs.length > 0 ? (
                savedJobs.map((job, index) => (
                  <React.Fragment key={job.id}>
                    {index > 0 && <Divider variant="inset" component="li" />}
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <Button
                          variant="outlined"
                          size="small"
                          component={RouterLink}
                          to={`/jobs/${job.id}`}
                        >
                          View Job
                        </Button>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <WorkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={job.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {job.company}
                            </Typography>
                            {" — " + job.location}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText 
                    primary="No saved jobs" 
                    secondary="Save jobs you're interested in to view them here" 
                  />
                </ListItem>
              )}
            </List>
            
            <Divider />
            
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
              <Button 
                component={RouterLink} 
                to="/jobs" 
                color="primary"
                startIcon={<SearchIcon />}
              >
                Browse Jobs
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper>
            <List sx={{ width: '100%' }}>
              <ListItem>
                <ListItemText 
                  primary="Recommended jobs will appear here" 
                  secondary="Complete your profile and job preferences to get personalized recommendations" 
                />
              </ListItem>
            </List>
            
            <Divider />
            
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
              <Button 
                component={RouterLink} 
                to="/profile" 
                color="primary"
                startIcon={<PersonIcon />}
              >
                Complete Your Profile
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
      
      {/* Application Actions Menu */}
      <Menu
        anchorEl={applicationMenuAnchorEl}
        open={Boolean(applicationMenuAnchorEl)}
        onClose={handleApplicationMenuClose}
      >
        <MenuItem onClick={() => handleUpdateStatus('interviewed')}>
          <ListItemIcon>
            <BusinessCenterIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mark as Interviewed</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleUpdateStatus('offered')}>
          <ListItemIcon>
            <WorkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mark as Offered</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleUpdateStatus('rejected')}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mark as Rejected</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleRatingDialogOpen}>
          <ListItemIcon>
            <StarIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Rate Application Process</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Rating Dialog */}
      <Dialog open={ratingDialogOpen} onClose={handleRatingDialogClose}>
        <DialogTitle>Rate Application Process</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component="legend">Rating:</Typography>
              <Rating
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                precision={0.5}
                size="large"
              />
            </Box>
            <TextField
              label="Comments"
              multiline
              rows={4}
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRatingDialogClose}>Cancel</Button>
          <Button onClick={handleSubmitRating} variant="contained" color="primary">
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobSeekerDashboard; 