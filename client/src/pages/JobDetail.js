import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';

// Mock data - would be replaced with actual API calls
const mockJob = {
  id: 1,
  title: 'Senior React Developer',
  company: 'TechCorp Inc',
  companyDescription: 'TechCorp is a leading technology company specializing in enterprise software solutions. With over 10 years in the industry, we have helped businesses across various sectors transform their digital presence.',
  location: 'New York, NY',
  type: 'Full-time',
  salary: '$120,000 - $150,000',
  experience: '3-5 years',
  postedDate: '2023-05-15',
  applicationDeadline: '2023-06-15',
  description: 'We are looking for an experienced React developer to join our growing team. You will be responsible for designing and implementing user interfaces, collaborating with back-end developers, and ensuring the technical feasibility of UI/UX designs.',
  responsibilities: [
    'Develop and implement new user-facing features using React.js',
    'Build reusable components and libraries for future use',
    'Translate designs and wireframes into high-quality code',
    'Optimize components for maximum performance across devices and browsers',
    'Coordinate with the rest of the engineering team to develop and ship new features'
  ],
  requirements: [
    'Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model',
    '3+ years of experience with React.js and Redux',
    'Experience with popular React workflows such as Flux or Redux',
    'Familiarity with RESTful APIs and modern authorization mechanisms',
    'Knowledge of modern front-end build pipelines and tools',
    'Experience with common front-end development tools such as Babel, Webpack, NPM, etc.',
    'Good understanding of asynchronous request handling, partial page updates, and AJAX'
  ],
  benefits: [
    'Competitive salary and comprehensive health benefits',
    'Flexible work hours and remote work options',
    '401(k) matching',
    'Continued education and professional development',
    'Casual work environment and team-building events',
    'Paid parental leave'
  ],
  skills: ['React', 'Redux', 'TypeScript', 'Node.js', 'RESTful APIs', 'Git'],
  contactEmail: 'careers@techcorp.com',
  contactPhone: '(555) 123-4567',
  companyWebsite: 'https://www.techcorp.com',
  companyLogo: 'https://via.placeholder.com/150'
};

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const savedJobs = useSelector(state => state.job?.savedJobs || []);
  const loading = useSelector(state => state.job?.loading || false);
  const error = useSelector(state => state.job?.error || null);
  
  const [job, setJob] = useState(null);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: user ? `${user.firstName} ${user.lastName}` : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
    coverLetter: ''
  });
  const [applicationSubmitting, setApplicationSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  
  useEffect(() => {
    // In a real app, this would dispatch an action to fetch job by ID
    // For now, we'll use mock data
    
    // Simulate loading
    const timer = setTimeout(() => {
      setJob(mockJob);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id, dispatch]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleSaveJob = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // This would dispatch an action to toggle saving a job
    // For now, we'll just console log
    console.log(`Toggle saved job ${id}`);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard'))
        .catch((err) => console.error('Failed to copy: ', err));
    }
  };
  
  const handleApplyOpen = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setApplyDialogOpen(true);
  };
  
  const handleApplyClose = () => {
    setApplyDialogOpen(false);
    // Reset application success state after dialog is closed
    if (applicationSuccess) {
      setTimeout(() => setApplicationSuccess(false), 300);
    }
  };
  
  const handleApplicationChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setApplicationSubmitting(true);
    
    // Simulate API call to submit application
    setTimeout(() => {
      setApplicationSubmitting(false);
      setApplicationSuccess(true);
      
      // In a real app, this would dispatch an action to submit job application
      console.log('Application submitted', applicationData);
    }, 1500);
  };
  
  if (loading || !job) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">
          {error}
        </Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleGoBack}
          sx={{ mt: 2 }}
        >
          Back to Jobs
        </Button>
      </Container>
    );
  }
  
  // Format dates
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // Check if job is saved
  const isJobSaved = savedJobs.includes(parseInt(id));
  
  // Calculate days left to apply
  const calculateDaysLeft = () => {
    const deadline = new Date(job.applicationDeadline);
    const today = new Date();
    const timeDiff = deadline - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft;
  };
  
  const daysLeft = calculateDaysLeft();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back button */}
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={handleGoBack}
        sx={{ mb: 3 }}
      >
        Back to Jobs
      </Button>
      
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4, boxShadow: 2 }}>
            <CardContent>
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {job.companyLogo && (
                    <Box
                      component="img"
                      src={job.companyLogo}
                      alt={`${job.company} logo`}
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        objectFit: 'contain', 
                        mr: 2,
                        border: '1px solid #eee',
                        borderRadius: 1,
                        p: 1
                      }}
                    />
                  )}
                  <Box>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                      {job.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {job.company}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton 
                    color="primary"
                    onClick={handleSaveJob}
                    aria-label={isJobSaved ? "Unsave job" : "Save job"}
                    sx={{ mr: 1 }}
                  >
                    {isJobSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={handleShare}
                    aria-label="Share job"
                  >
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Box>
              
              {/* Job Details */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {job.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WorkIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {job.type}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AttachMoneyIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {job.salary}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BusinessIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {job.experience}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarTodayIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Posted: {formatDate(job.postedDate)}
                  </Typography>
                </Box>
              </Box>
              
              {/* Apply Button */}
              <Box sx={{ mb: 4 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={handleApplyOpen}
                  sx={{ px: 4, py: 1 }}
                >
                  Apply Now
                </Button>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {daysLeft > 0 
                    ? `Application deadline: ${formatDate(job.applicationDeadline)} (${daysLeft} days left to apply)`
                    : 'Application deadline has passed'
                  }
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 4 }} />
              
              {/* Job Description */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Job Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {job.description}
                </Typography>
              </Box>
              
              {/* Responsibilities */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Responsibilities
                </Typography>
                <List>
                  {job.responsibilities.map((responsibility, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleOutlineIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={responsibility} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              
              {/* Requirements */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Requirements
                </Typography>
                <List>
                  {job.requirements.map((requirement, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleOutlineIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={requirement} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              
              {/* Benefits */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Benefits
                </Typography>
                <List>
                  {job.benefits.map((benefit, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleOutlineIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={benefit} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              
              {/* Skills */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Skills & Expertise
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {job.skills.map((skill, index) => (
                    <Chip 
                      key={index} 
                      label={skill} 
                      variant="outlined"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Company Info */}
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              About {job.company}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              my: 2, 
              p: 2, 
              backgroundColor: '#f8f9fa', 
              borderRadius: 1 
            }}>
              <Box
                component="img"
                src={job.companyLogo}
                alt={`${job.company} logo`}
                sx={{ 
                  width: '100%', 
                  maxWidth: 180, 
                  height: 'auto', 
                  objectFit: 'contain'
                }}
              />
            </Box>
            <Typography variant="body2" paragraph>
              {job.companyDescription}
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
              href={job.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 1 }}
            >
              Visit Website
            </Button>
          </Paper>
          
          {/* Contact Information */}
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Email" 
                  secondary={
                    <Typography 
                      component="a" 
                      variant="body2" 
                      href={`mailto:${job.contactEmail}`}
                      color="primary"
                    >
                      {job.contactEmail}
                    </Typography>
                  } 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Phone" 
                  secondary={
                    <Typography 
                      component="a" 
                      variant="body2" 
                      href={`tel:${job.contactPhone}`}
                      color="primary"
                    >
                      {job.contactPhone}
                    </Typography>
                  } 
                />
              </ListItem>
            </List>
          </Paper>
          
          {/* Similar Jobs - placeholder for future implementation */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Similar Jobs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Similar job listings will appear here.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Apply Dialog */}
      <Dialog 
        open={applyDialogOpen} 
        onClose={handleApplyClose}
        fullWidth
        maxWidth="md"
      >
        {applicationSuccess ? (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              Application Submitted
            </DialogTitle>
            <DialogContent>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                py: 4,
                textAlign: 'center'
              }}>
                <CheckCircleOutlineIcon 
                  color="success" 
                  sx={{ fontSize: 64, mb: 2 }} 
                />
                <Typography variant="h5" gutterBottom>
                  Your application has been submitted!
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  We've sent a confirmation email to {applicationData.email}
                </Typography>
                <Typography variant="body1" paragraph>
                  What happens next? The employer will review your application and contact you if they'd like to move forward.
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button onClick={handleApplyClose} color="primary" variant="contained">
                Close
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              Apply for {job.title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ mb: 3 }}>
                Please fill out the following information to apply for this position at {job.company}.
              </DialogContentText>
              
              <form onSubmit={handleSubmitApplication}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Full Name"
                      value={applicationData.name}
                      onChange={handleApplicationChange}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <PersonIcon color="action" sx={{ mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="email"
                      label="Email Address"
                      type="email"
                      value={applicationData.email}
                      onChange={handleApplicationChange}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <EmailIcon color="action" sx={{ mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="phone"
                      label="Phone Number"
                      value={applicationData.phone}
                      onChange={handleApplicationChange}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <PhoneIcon color="action" sx={{ mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="coverLetter"
                      label="Cover Letter"
                      multiline
                      rows={6}
                      value={applicationData.coverLetter}
                      onChange={handleApplicationChange}
                      fullWidth
                      placeholder="Tell us why you're interested in this position and how your skills and experience make you a good fit."
                      required
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ pt: 2 }}>
                            <DescriptionIcon color="action" sx={{ mr: 1 }} />
                          </Box>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      You can also upload your resume and additional documents after submitting this form.
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button onClick={handleApplyClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitApplication} 
                variant="contained" 
                color="primary"
                disabled={applicationSubmitting}
                startIcon={applicationSubmitting && <CircularProgress size={20} color="inherit" />}
              >
                {applicationSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default JobDetail; 