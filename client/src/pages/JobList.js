import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
  Chip,
  useTheme,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { fetchJobs } from '../store/slices/jobSlice';
import { Link } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { saveJob, unsaveJob } from '../actions/jobActions';
import debounce from 'lodash/debounce';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green color
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#FF6B6B', // Coral color
      light: '#FF8E8E',
      dark: '#E64A19',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error, totalPages, currentPage, totalJobs } = useSelector(state => state.jobs);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const savedJobs = useSelector(state => state.job?.savedJobs || []);
  const user = useSelector(state => state.auth.user);
  
  // Filter states
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [jobType, setJobType] = useState(searchParams.get('jobType') || '');
  const [experience, setExperience] = useState(searchParams.get('experience') || '');
  const [locationQuery, setLocationQuery] = useState(searchParams.get('location') || '');
  const [minSalary, setMinSalary] = useState(searchParams.get('minSalary') || '');
  const [maxSalary, setMaxSalary] = useState(searchParams.get('maxSalary') || '');
  const [datePosted, setDatePosted] = useState('');

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      setSearchParams(params);
    }, 500),
    [searchParams, setSearchParams]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  // Categories and job types
  const categories = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing',
    'Sales', 'Engineering', 'Design', 'Customer Service', 'Other'
  ];

  const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];
  const experienceLevels = ['entry', 'mid', 'senior', 'lead', 'executive'];

  useEffect(() => {
    const filters = {
      search,
      category,
      jobType,
      experience,
      location: locationQuery,
      minSalary,
      maxSalary,
      page: searchParams.get('page') || 1
    };

    dispatch(fetchJobs(filters));
  }, [dispatch, search, category, jobType, experience, locationQuery, minSalary, maxSalary, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (jobType) params.set('jobType', jobType);
    if (experience) params.set('experience', experience);
    if (locationQuery) params.set('location', locationQuery);
    if (minSalary) params.set('minSalary', minSalary);
    if (maxSalary) params.set('maxSalary', maxSalary);
    setSearchParams(params);
  };

  const handlePageChange = (event, value) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', value);
    setSearchParams(params);
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Not specified';
    if (!max) return `$${min}+`;
    return `$${min} - $${max}`;
  };

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleSaveJob = (e, jobId) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    
    const isSaved = savedJobs.some(job => job.id === jobId);
    if (isSaved) {
      dispatch(unsaveJob(jobId));
    } else {
      dispatch(saveJob(jobId));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Browse Jobs
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Search and Filters */}
          <Card sx={{ mb: 4, backgroundColor: 'background.paper' }}>
            <CardContent>
              <form onSubmit={handleSearch}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Search"
                      value={search}
                      onChange={handleSearchChange}
                      placeholder="Job title, keyword, or company"
                      InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1, color: 'primary.main' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <MenuItem value="">All Categories</MenuItem>
                        {categories.map((cat) => (
                          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Job Type</InputLabel>
                      <Select
                        value={jobType}
                        label="Job Type"
                        onChange={(e) => setJobType(e.target.value)}
                      >
                        <MenuItem value="">All Types</MenuItem>
                        {jobTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Experience</InputLabel>
                      <Select
                        value={experience}
                        label="Experience"
                        onChange={(e) => setExperience(e.target.value)}
                      >
                        <MenuItem value="">All Levels</MenuItem>
                        {experienceLevels.map((level) => (
                          <MenuItem key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Location"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      placeholder="City, State, or Remote"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Min Salary"
                      type="number"
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      placeholder="Minimum"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Max Salary"
                      type="number"
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                      placeholder="Maximum"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Search Jobs
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>

          {/* Results Count */}
          <Typography variant="body1" sx={{ mb: 2 }}>
            Found {totalJobs} jobs matching your criteria
          </Typography>

          {/* Job List */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
              <CircularProgress />
            </Box>
          ) : jobs.length === 0 ? (
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No jobs found matching your criteria
              </Typography>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {jobs.map((job) => (
                <Grid item xs={12} key={job.id}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                    onClick={() => handleJobClick(job.id)}
                  >
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={8}>
                          <Typography variant="h6" gutterBottom>
                            {job.title}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={2} mb={1}>
                            <Typography variant="body2" color="text.secondary">
                              <BusinessIcon sx={{ mr: 0.5, fontSize: 16 }} />
                              {job.company}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <LocationOnIcon sx={{ mr: 0.5, fontSize: 16 }} />
                              {job.location}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Chip 
                              icon={<WorkIcon />} 
                              label={job.type} 
                              size="small" 
                              sx={{ backgroundColor: 'primary.light', color: 'white' }}
                            />
                            <Chip 
                              icon={<AttachMoneyIcon />} 
                              label={job.salary} 
                              size="small" 
                              sx={{ backgroundColor: 'secondary.light', color: 'white' }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={(e) => handleSaveJob(e, job.id)}
                            startIcon={savedJobs.some(savedJob => savedJob.id === job.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                          >
                            {savedJobs.some(savedJob => savedJob.id === job.id) ? 'Saved' : 'Save Job'}
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default JobList; 