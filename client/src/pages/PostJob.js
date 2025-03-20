import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createJob } from '../store/slices/jobSlice';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const PostJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.jobs);
  const { user } = useSelector(state => state.auth);

  const categories = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing',
    'Sales', 'Engineering', 'Design', 'Customer Service', 'Other'
  ];

  const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];
  const experienceLevels = ['entry', 'mid', 'senior', 'lead', 'executive'];

  const formik = useFormik({
    initialValues: {
      title: '',
      company: user?.company || '',
      location: '',
      description: '',
      requirements: '',
      salary: {
        min: '',
        max: ''
      },
      jobType: '',
      category: '',
      experience: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Job title is required'),
      company: Yup.string().required('Company name is required'),
      location: Yup.string().required('Location is required'),
      description: Yup.string().required('Job description is required'),
      requirements: Yup.string().required('Job requirements are required'),
      salary: Yup.object({
        min: Yup.number().required('Minimum salary is required'),
        max: Yup.number()
          .min(Yup.ref('min'), 'Maximum salary must be greater than minimum salary')
          .required('Maximum salary is required')
      }),
      jobType: Yup.string().required('Job type is required'),
      category: Yup.string().required('Category is required'),
      experience: Yup.string().required('Experience level is required')
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(createJob(values)).unwrap();
        navigate('/jobs');
      } catch (error) {
        console.error('Failed to create job:', error);
      }
    }
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Post a New Job
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Card>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Job Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="company"
                    name="company"
                    label="Company Name"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.company && Boolean(formik.errors.company)}
                    helperText={formik.touched.company && formik.errors.company}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="location"
                    name="location"
                    label="Location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Job Type</InputLabel>
                    <Select
                      id="jobType"
                      name="jobType"
                      value={formik.values.jobType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.jobType && Boolean(formik.errors.jobType)}
                    >
                      {jobTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.jobType && formik.errors.jobType && (
                      <Typography color="error" variant="caption">
                        {formik.errors.jobType}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      id="category"
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.category && Boolean(formik.errors.category)}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                      <Typography color="error" variant="caption">
                        {formik.errors.category}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Experience Level</InputLabel>
                    <Select
                      id="experience"
                      name="experience"
                      value={formik.values.experience}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.experience && Boolean(formik.errors.experience)}
                    >
                      {experienceLevels.map((level) => (
                        <MenuItem key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.experience && formik.errors.experience && (
                      <Typography color="error" variant="caption">
                        {formik.errors.experience}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="salary.min"
                    name="salary.min"
                    label="Minimum Salary"
                    type="number"
                    value={formik.values.salary.min}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.salary?.min && Boolean(formik.errors.salary?.min)}
                    helperText={formik.touched.salary?.min && formik.errors.salary?.min}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="salary.max"
                    name="salary.max"
                    label="Maximum Salary"
                    type="number"
                    value={formik.values.salary.max}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.salary?.max && Boolean(formik.errors.salary?.max)}
                    helperText={formik.touched.salary?.max && formik.errors.salary?.max}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Job Description"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="requirements"
                    name="requirements"
                    label="Requirements"
                    multiline
                    rows={4}
                    value={formik.values.requirements}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.requirements && Boolean(formik.errors.requirements)}
                    helperText={formik.touched.requirements && formik.errors.requirements}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <WorkIcon />}
                  >
                    {loading ? 'Posting Job...' : 'Post Job'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default PostJob; 