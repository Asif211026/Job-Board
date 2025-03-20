import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import WorkIcon from '@mui/icons-material/Work';
import Container from '@mui/material/Container';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <WorkIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              fontWeight: 'bold'
            }}
          >
            Job Dekho
          </Typography>

          <Box sx={{ ml: 2 }}>
            <Button component={Link} to="/jobs" color="inherit">
              Browse Jobs
            </Button>

            {isAuthenticated && user ? (
              <>
                {user.userType === 'employer' && (
                  <Button component={Link} to="/post-job" color="inherit">
                    Post Job
                  </Button>
                )}

                {user.userType === 'jobseeker' && (
                  <Button component={Link} to="/applications" color="inherit">
                    Applications
                  </Button>
                )}

                {user.userType === 'admin' && (
                  <Button component={Link} to="/admin" color="inherit">
                    Admin
                  </Button>
                )}

                <Button component={Link} to="/profile" color="inherit">
                  Profile
                </Button>
                
                <Button onClick={handleLogout} color="inherit">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button 
                  component={Link} 
                  to="/register" 
                  color="inherit"
                  variant="outlined"
                  sx={{ ml: 1, borderColor: 'white', '&:hover': { borderColor: 'white' } }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 