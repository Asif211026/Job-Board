import {
  GET_JOBS,
  GET_JOB,
  JOB_ERROR,
  CREATE_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  TOGGLE_JOB_SAVED,
  APPLY_TO_JOB,
  SET_LOADING,
  CLEAR_ERROR
} from '../actions/types';

const initialState = {
  jobs: [],
  job: null,
  savedJobs: [],
  applications: [],
  loading: false,
  error: null,
  totalJobs: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10
};

export default function jobReducer(state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
      
    case GET_JOBS:
      return {
        ...state,
        jobs: payload.jobs,
        totalJobs: payload.totalJobs,
        totalPages: payload.totalPages,
        currentPage: payload.currentPage,
        limit: payload.limit,
        loading: false,
        error: null
      };
      
    case GET_JOB:
      return {
        ...state,
        job: payload,
        loading: false,
        error: null
      };
      
    case CREATE_JOB:
      return {
        ...state,
        jobs: [payload, ...state.jobs],
        job: payload,
        loading: false,
        error: null
      };
      
    case UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map(job => job._id === payload._id ? payload : job),
        job: payload,
        loading: false,
        error: null
      };
      
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job._id !== payload),
        loading: false,
        error: null
      };
      
    case TOGGLE_JOB_SAVED:
      return {
        ...state,
        savedJobs: payload.savedJobs,
        loading: false,
        error: null
      };
      
    case APPLY_TO_JOB:
      return {
        ...state,
        applications: [...state.applications, payload],
        loading: false,
        error: null
      };
      
    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
      
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
      
    default:
      return state;
  }
} 