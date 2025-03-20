import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton,
  Divider,
  Button
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { toggleJobSaved } from '../../actions/jobActions';

const JobCard = ({ job, variant = 'default', showActions = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const savedJobs = useSelector(state => state.job?.savedJobs || []);
  
  // Check if job is saved
  const isJobSaved = savedJobs.includes(job.id);
  
  // Format date function
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
  
  // Handle job click
  const handleJobClick = () => {
    navigate(`/jobs/${job.id}`);
  };
  
  // Handle save job
  const handleSaveJob = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(toggleJobSaved(job.id));
  };
  
  // Handle apply
  const handleApply = (e) => {
    e.stopPropagation();
    navigate(`/jobs/${job.id}`);
  };
  
  return (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        },
        ...(variant === 'compact' && {
          boxShadow: 1
        })
      }}
      onClick={handleJobClick}
    >
      <CardContent sx={{ 
        ...(variant === 'compact' && {
          p: 2,
          '&:last-child': { pb: 2 }
        })
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Box>
            <Typography 
              variant={variant === 'compact' ? 'h6' : 'h5'} 
              component="h2" 
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              {job.title}
            </Typography>
            <Typography 
              variant={variant === 'compact' ? 'subtitle2' : 'subtitle1'} 
              color="text.secondary" 
              gutterBottom
            >
              {job.company}
            </Typography>
          </Box>
          {showActions && (
            <IconButton 
              onClick={handleSaveJob}
              color="primary"
              aria-label={isJobSaved ? "Unsave job" : "Save job"}
              sx={{ height: 'fit-content' }}
            >
              {isJobSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          )}
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: variant === 'compact' ? 1 : 2, 
          mb: 2 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {job.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {job.type}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              Posted {formatDate(job.postedDate)}
            </Typography>
          </Box>
        </Box>
        
        {variant !== 'compact' && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 1 
            }}>
              {job.description}
            </Typography>
          </Box>
        )}
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          ...(variant === 'compact' && {
            mt: 1
          })
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 0.5,
            maxWidth: variant === 'compact' ? '70%' : '80%'
          }}>
            {job.skills && job.skills.slice(0, variant === 'compact' ? 2 : 4).map((skill, index) => (
              <Chip 
                key={index} 
                label={skill} 
                size="small" 
                variant="outlined"
                sx={{ fontSize: variant === 'compact' ? '0.7rem' : '0.75rem' }}
              />
            ))}
            {job.skills && job.skills.length > (variant === 'compact' ? 2 : 4) && (
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', ml: 0.5 }}>
                +{job.skills.length - (variant === 'compact' ? 2 : 4)} more
              </Typography>
            )}
          </Box>
          
          <Typography 
            variant={variant === 'compact' ? 'body2' : 'subtitle2'} 
            color="primary" 
            fontWeight="bold"
          >
            {job.salary}
          </Typography>
        </Box>
        
        {variant === 'featured' && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BusinessIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {job.experience || 'Experience: Not specified'}
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                color="primary" 
                size="small"
                onClick={handleApply}
              >
                Apply Now
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard; 