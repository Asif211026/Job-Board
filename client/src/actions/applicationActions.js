import axios from 'axios';
import {
  GET_APPLICATIONS,
  GET_APPLICATION,
  ADD_APPLICATION,
  UPDATE_APPLICATION,
  DELETE_APPLICATION,
  APPLICATION_ERROR,
  CLEAR_APPLICATION
} from './types';
import { setAlert } from './alertActions';
import { getMockApplications } from '../utils/mockData';

// Get all applications for current user
export const getApplications = () => async dispatch => {
  try {
    // In development, use mock data
    // In production, this would be an API call:
    // const res = await axios.get('/api/applications');
    
    const applications = getMockApplications();
    
    dispatch({
      type: GET_APPLICATIONS,
      payload: applications
    });
  } catch (err) {
    dispatch({
      type: APPLICATION_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to fetch applications', status: err.response?.status }
    });
  }
};

// Get application by ID
export const getApplicationById = (id) => async dispatch => {
  try {
    // In development, use mock data
    // In production, this would be an API call:
    // const res = await axios.get(`/api/applications/${id}`);
    
    const applications = getMockApplications();
    const application = applications.find(app => app.id === id);
    
    if (!application) {
      throw new Error('Application not found');
    }
    
    dispatch({
      type: GET_APPLICATION,
      payload: application
    });
  } catch (err) {
    dispatch({
      type: APPLICATION_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to fetch application', status: err.response?.status }
    });
  }
};

// Submit a new application
export const submitApplication = (jobId, formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    // In production, this would be an API call:
    // const res = await axios.post(`/api/jobs/${jobId}/apply`, formData, config);
    
    // For development, simulate API call
    const newApplication = {
      id: Math.random().toString(36).substring(7),
      job: {
        id: jobId,
        title: 'Sample Job', // Would be fetched from job details
        company: 'Sample Company'
      },
      status: 'pending',
      appliedDate: new Date().toISOString(),
      ...formData
    };
    
    dispatch({
      type: ADD_APPLICATION,
      payload: newApplication
    });
    
    dispatch(setAlert('Application submitted successfully', 'success'));
    
    // Redirect to applications page
    history.push('/applications');
  } catch (err) {
    dispatch({
      type: APPLICATION_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to submit application', status: err.response?.status }
    });
    
    dispatch(setAlert('Failed to submit application', 'error'));
  }
};

// Update application status
export const updateApplicationStatus = (id, status) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    // In production, this would be an API call:
    // const res = await axios.put(`/api/applications/${id}/status`, { status }, config);
    
    // For development, simulate API call
    const applications = getMockApplications();
    const application = applications.find(app => app.id === id);
    
    if (!application) {
      throw new Error('Application not found');
    }
    
    const updatedApplication = {
      ...application,
      status
    };
    
    dispatch({
      type: UPDATE_APPLICATION,
      payload: updatedApplication
    });
    
    dispatch(setAlert('Application status updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: APPLICATION_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to update application status', status: err.response?.status }
    });
    
    dispatch(setAlert('Failed to update application status', 'error'));
  }
};

// Delete an application
export const deleteApplication = (id) => async dispatch => {
  try {
    // In production, this would be an API call:
    // await axios.delete(`/api/applications/${id}`);
    
    dispatch({
      type: DELETE_APPLICATION,
      payload: id
    });
    
    dispatch(setAlert('Application removed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: APPLICATION_ERROR,
      payload: { msg: err.response?.data.message || 'Failed to delete application', status: err.response?.status }
    });
    
    dispatch(setAlert('Failed to delete application', 'error'));
  }
};

// Clear current application
export const clearApplication = () => dispatch => {
  dispatch({
    type: CLEAR_APPLICATION
  });
}; 