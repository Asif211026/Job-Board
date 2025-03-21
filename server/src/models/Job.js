const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    responsibilities: [String],
    requirements: [String],
    benefits: [String],
    experience: {
        type: String,
        enum: ['entry', 'mid', 'senior', 'lead', 'executive'],
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    skills: [String],
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'draft'],
        default: 'active'
    },
    applicationDeadline: {
        type: Date
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    tags: [String],
    applicationsCount: {
        type: Number,
        default: 0
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    postedDate: {
        type: Date,
        default: Date.now
    }
});

// Create a text index for searching
JobSchema.index({
    title: 'text',
    company: 'text',
    description: 'text',
    skills: 'text'
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job; 