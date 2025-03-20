import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getMockJobs } from '../../utils/mockData';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (filters = {}) => {
    // In development, use mock data
    // In production, this would be an API call
    const jobs = getMockJobs();
    
    // Apply filters
    let filteredJobs = [...jobs];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.category) {
      filteredJobs = filteredJobs.filter(job => 
        job.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    if (filters.jobType) {
      filteredJobs = filteredJobs.filter(job => 
        job.type.toLowerCase() === filters.jobType.toLowerCase()
      );
    }
    
    if (filters.experience) {
      filteredJobs = filteredJobs.filter(job => 
        job.experience.toLowerCase() === filters.experience.toLowerCase()
      );
    }
    
    if (filters.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.minSalary) {
      const minSalary = parseInt(filters.minSalary.replace(/[^0-9]/g, ''));
      filteredJobs = filteredJobs.filter(job => {
        const jobMinSalary = parseInt(job.salary.split('-')[0].replace(/[^0-9]/g, ''));
        return jobMinSalary >= minSalary;
      });
    }
    
    if (filters.maxSalary) {
      const maxSalary = parseInt(filters.maxSalary.replace(/[^0-9]/g, ''));
      filteredJobs = filteredJobs.filter(job => {
        const jobMaxSalary = parseInt(job.salary.split('-')[1].replace(/[^0-9]/g, ''));
        return jobMaxSalary <= maxSalary;
      });
    }
    
    // Pagination
    const page = parseInt(filters.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
    
    return {
      jobs: paginatedJobs,
      totalJobs: filteredJobs.length,
      totalPages: Math.ceil(filteredJobs.length / limit),
      currentPage: page
    };
  }
);

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/jobs`, jobData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const applyForJob = createAsyncThunk(
  'jobs/applyForJob',
  async ({ jobId, applicationData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/jobs/${jobId}/apply`,
        applicationData,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchEmployerJobs = createAsyncThunk(
  'jobs/fetchEmployerJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/employer/jobs`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchJobSeekerApplications = createAsyncThunk(
  'jobs/fetchJobSeekerApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/applications/my`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  jobs: [],
  currentJob: null,
  employerJobs: [],
  applications: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalJobs: 0
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
    clearJobs: (state) => {
      state.jobs = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalJobs = action.payload.totalJobs;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Job By ID
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Create Job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.unshift(action.payload);
        state.employerJobs.unshift(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Apply For Job
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentJob) {
          state.currentJob.applications.push(action.payload);
        }
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Fetch Employer Jobs
      .addCase(fetchEmployerJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.employerJobs = action.payload;
      })
      .addCase(fetchEmployerJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Fetch Job Seeker Applications
      .addCase(fetchJobSeekerApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobSeekerApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchJobSeekerApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  }
});

export const { clearError, clearCurrentJob, clearJobs } = jobSlice.actions;
export default jobSlice.reducer; 