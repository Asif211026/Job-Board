const Job = require('../models/Job');
const { validationResult } = require('express-validator');

// Create new job posting
exports.createJob = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const job = new Job({
            ...req.body,
            employer: req.user._id
        });

        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all jobs with filters
exports.getJobs = async (req, res) => {
    try {
        const {
            search,
            category,
            jobType,
            experience,
            location,
            minSalary,
            maxSalary,
            page = 1,
            limit = 10
        } = req.query;

        const query = { status: 'active' };

        // Apply filters
        if (search) {
            query.$text = { $search: search };
        }
        if (category) query.category = category;
        if (jobType) query.jobType = jobType;
        if (experience) query.experience = experience;
        if (location) query.location = { $regex: location, $options: 'i' };
        if (minSalary || maxSalary) {
            query.salary = {};
            if (minSalary) query.salary.min = { $gte: Number(minSalary) };
            if (maxSalary) query.salary.max = { $lte: Number(maxSalary) };
        }

        const jobs = await Job.find(query)
            .populate('employer', 'name company')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Job.countDocuments(query);

        res.json({
            jobs,
            total,
            pages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get single job
exports.getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('employer', 'name company')
            .populate('applications.applicant', 'name email');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update job
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if user is the employer or admin
        if (job.employer.toString() !== req.user._id.toString() && req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this job' });
        }

        const updates = Object.keys(req.body);
        updates.forEach(update => job[update] = req.body[update]);
        await job.save();

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete job
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if user is the employer or admin
        if (job.employer.toString() !== req.user._id.toString() && req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this job' });
        }

        await job.remove();
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Apply for a job
exports.applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if job is active
        if (job.status !== 'active') {
            return res.status(400).json({ message: 'This job is no longer accepting applications' });
        }

        // Check if already applied
        const hasApplied = job.applications.some(
            application => application.applicant.toString() === req.user._id.toString()
        );

        if (hasApplied) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        // Add application
        job.applications.push({
            applicant: req.user._id,
            resume: req.body.resume,
            coverLetter: req.body.coverLetter
        });

        await job.save();
        res.json({ message: 'Application submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get employer's jobs
exports.getEmployerJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ employer: req.user._id })
            .populate('applications.applicant', 'name email')
            .sort({ createdAt: -1 });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get job seeker's applications
exports.getJobSeekerApplications = async (req, res) => {
    try {
        const jobs = await Job.find({
            'applications.applicant': req.user._id
        })
        .populate('employer', 'name company')
        .sort({ createdAt: -1 });

        const applications = jobs.map(job => {
            const application = job.applications.find(
                app => app.applicant.toString() === req.user._id.toString()
            );
            return {
                job: {
                    id: job._id,
                    title: job.title,
                    company: job.employer.company,
                    location: job.location
                },
                application: {
                    status: application.status,
                    appliedAt: application.appliedAt
                }
            };
        });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all jobs for admin
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate('employer', 'name company')
            .sort({ createdAt: -1 });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update job status for admin
exports.updateJobStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['active', 'inactive', 'closed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        
        const job = await Job.findById(req.params.id);
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        
        job.status = status;
        await job.save();
        
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}; 