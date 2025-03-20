import {
  GET_JOBS,
  GET_JOB,
  ADD_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  JOB_ERROR,
  CLEAR_JOB,
  SAVE_JOB,
  UNSAVE_JOB,
  GET_SAVED_JOBS
} from './types';
import { setAlert } from './alertActions';
import { getMockJobs, getMockSavedJobs } from '../utils/mockData';

// Get all jobs with optional filters
export const getJobs = (filters = {}) => async dispatch => {
  try {
    // In development, use mock data
    // In production, this would be an API call:
    // const res = await axios.get('/api/jobs', { params: filters });
    
    let jobs = getMockJobs();
    
    // Apply filters if provided
    if (filters.employer) {
      jobs = jobs.filter(job => job.employer === filters.employer);
    }
    if (filters.location) {
      jobs = jobs.filter(job => job.location.includes(filters.location));
    }
    if (filters.title) {
      jobs = jobs.filter(job => job.title.toLowerCase().includes(filters.title.toLowerCase()));
    }
    
    dispatch({
      type: GET_JOBS,
      payload: jobs
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to fetch jobs', status: err.response?.status }
    });
  }
};

// Get job by ID
export const getJobById = (id) => async dispatch => {
  try {
    // In development, use mock data
    // In production, this would be an API call:
    // const res = await axios.get(`/api/jobs/${id}`);
    
    const jobs = getMockJobs();
    const job = jobs.find(job => job.id === id);
    
    if (!job) {
      throw new Error('Job not found');
    }
    
    dispatch({
      type: GET_JOB,
      payload: job
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to fetch job', status: err.response?.status }
    });
  }
};

// Create a new job
export const createJob = (formData, history) => async dispatch => {
  try {
    // In production, this would be an API call:
    // const res = await axios.post('/api/jobs', formData);
    
    // For development, simulate API call
    const newJob = {
      id: Math.random().toString(36).substring(7),
      ...formData,
      postedDate: new Date().toISOString()
    };
    
    dispatch({
      type: ADD_JOB,
      payload: newJob
    });
    
    dispatch(setAlert('Job created successfully', 'success'));
    
    // Redirect to employer dashboard
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to create job', status: err.response?.status }
    });
    
    dispatch(setAlert('Failed to create job', 'error'));
  }
};

// Update existing job
export const updateJob = (id, formData, history) => async dispatch => {
  try {
    // In production, this would be an API call:
    // const res = await axios.put(`/api/jobs/${id}`, formData);
    
    // For development, simulate API call
    const updatedJob = {
      id,
      ...formData
    };
    
    dispatch({
      type: UPDATE_JOB,
      payload: updatedJob
    });
    
    dispatch(setAlert('Job updated successfully', 'success'));
    
    // Redirect to job details
    history.push(`/jobs/${id}`);
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to update job', status: err.response?.status }
    });
    
    dispatch(setAlert('Failed to update job', 'error'));
  }
};

// Delete a job
export const deleteJob = (id) => async dispatch => {
  try {
    // In production, this would be an API call:
    // await axios.delete(`/api/jobs/${id}`);
    
    dispatch({
      type: DELETE_JOB,
      payload: id
    });
    
    dispatch(setAlert('Job removed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to delete job', status: err.response?.status }
    });
    
    dispatch(setAlert('Failed to delete job', 'error'));
  }
};

// Save a job for a user
export const saveJob = (jobId) => async dispatch => {
  try {
    // In production, this would be an API call:
    // const res = await axios.post(`/api/jobs/${jobId}/save`);
    
    dispatch({
      type: SAVE_JOB,
      payload: jobId
    });
    
    dispatch(setAlert('Job saved', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to save job', status: err.response?.status }
    });
    
    dispatch(setAlert('Failed to save job', 'error'));
  }
};

// Unsave a job for a user
export const unsaveJob = (jobId) => async dispatch => {
  try {
    // In production, this would be an API call:
    // await axios.delete(`/api/jobs/${jobId}/save`);
    
    dispatch({
      type: UNSAVE_JOB,
      payload: jobId
    });
    
    dispatch(setAlert('Job removed from saved jobs', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to unsave job', status: err.response?.status }
    });
    
    dispatch(setAlert('Failed to remove job from saved jobs', 'error'));
  }
};

// Get saved jobs for current user
export const getSavedJobs = () => async dispatch => {
  try {
    // In development, use mock data
    // In production, this would be an API call:
    // const res = await axios.get('/api/jobs/saved');
    
    const savedJobsIds = getMockSavedJobs().map(savedJob => savedJob.jobId);
    const allJobs = getMockJobs();
    const savedJobs = allJobs.filter(job => savedJobsIds.includes(job.id));
    
    dispatch({
      type: GET_SAVED_JOBS,
      payload: savedJobs
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to fetch saved jobs', status: err.response?.status }
    });
  }
};

// Clear current job
export const clearJob = () => dispatch => {
  dispatch({
    type: CLEAR_JOB
  });
}; 