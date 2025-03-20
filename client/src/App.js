import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';
import Applications from './pages/Applications';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { getProfile } from './store/slices/authSlice';
import theme from './theme';
import Footer from './components/layout/Footer';
import NotFound from './pages/NotFound';

// Create mock data for testing
import { setupMockData } from './utils/mockData';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, token, error, loading } = useSelector(state => state.auth);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [pageLoading, setPageLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // Load user on initial load if token exists
  useEffect(() => {
    if (token && !user) {
      dispatch(getProfile());
    }
    
    // Setup mock data for testing
    setupMockData();
    
    // Simulate initial loading
    const timer = setTimeout(() => {
      setPageLoading(false);
      setInitialLoad(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [dispatch, token, user]);

  // Handle auth redirects
  useEffect(() => {
    // Redirect to home if user logs in on auth pages
    if (isAuthenticated && 
        (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Show error in snackbar
  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: 'error'
      });
    }
  }, [error]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Initial app loading screen
  if (initialLoad) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Box sx={{ textAlign: 'center', color: 'white', mb: 3 }}>
          <Box
            component="img"
            src="/assets/logo-white.png"
            alt="Job Board Logo"
            sx={{ width: 120, height: 120, mb: 3 }}
          />
          <Box
            component="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: '2.5rem',
              mb: 1,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            Job Board
          </Box>
          <Box
            component="p"
            sx={{ 
              fontSize: '1.2rem', 
              opacity: 0.9,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            Your Gateway to Career Success
          </Box>
        </Box>
        <CircularProgress sx={{ color: 'white' }} size={50} thickness={4} />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Navbar />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading || pageLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Box sx={{ flexGrow: 1 }}>
          <Container 
            maxWidth="lg" 
            sx={{ 
              mt: { xs: 2, sm: 3, md: 4 },
              mb: { xs: 2, sm: 3, md: 4 },
              px: { xs: 2, sm: 3 } 
            }}
          >
            <Fade in={!pageLoading} timeout={500}>
              <Box>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/jobs" element={<JobList />} />
                  <Route path="/jobs/:id" element={<JobDetail />} />
                  <Route
                    path="/post-job"
                    element={
                      <PrivateRoute allowedRoles={['employer', 'admin']}>
                        <PostJob />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/applications"
                    element={
                      <PrivateRoute allowedRoles={['jobseeker']}>
                        <Applications />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <PrivateRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Box>
            </Fade>
          </Container>
        </Box>
        
        <Footer />

        {/* Global notification */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App; 