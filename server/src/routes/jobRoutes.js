const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth, checkUserType } = require('../middleware/auth');
const jobController = require('../controllers/jobController');

// Validation middleware
const jobValidation = [
    body('title').notEmpty().withMessage('Job title is required'),
    body('company').notEmpty().withMessage('Company name is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('description').notEmpty().withMessage('Job description is required'),
    body('requirements').notEmpty().withMessage('Job requirements are required'),
    body('salary.min').isNumeric().withMessage('Minimum salary must be a number'),
    body('salary.max').isNumeric().withMessage('Maximum salary must be a number'),
    body('jobType')
        .isIn(['full-time', 'part-time', 'contract', 'internship'])
        .withMessage('Invalid job type'),
    body('category').notEmpty().withMessage('Job category is required'),
    body('experience')
        .isIn(['entry', 'mid', 'senior', 'lead', 'executive'])
        .withMessage('Invalid experience level')
];

// Public routes
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJob);

// Protected routes
router.post('/', auth, checkUserType(['employer', 'admin']), jobValidation, jobController.createJob);
router.put('/:id', auth, checkUserType(['employer', 'admin']), jobValidation, jobController.updateJob);
router.delete('/:id', auth, checkUserType(['employer', 'admin']), jobController.deleteJob);

// Application routes
router.post('/:id/apply', auth, checkUserType(['jobseeker']), jobController.applyForJob);

// Employer routes
router.get('/employer/jobs', auth, checkUserType(['employer']), jobController.getEmployerJobs);

// Job seeker routes
router.get('/applications/my', auth, checkUserType(['jobseeker']), jobController.getJobSeekerApplications);

// Admin routes
router.get('/admin/all', auth, checkUserType(['admin']), jobController.getAllJobs);
router.put('/admin/:id/status', auth, checkUserType(['admin']), jobController.updateJobStatus);

module.exports = router; 