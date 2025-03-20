const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

// @route   GET api/applications
// @desc    Get all applications for current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate('job', ['title', 'company', 'location'])
      .sort({ date: -1 });
    
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/applications/:id
// @desc    Get application by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job', ['title', 'company', 'location', 'description', 'requirements']);
    
    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }
    
    // Check if the application belongs to the current user
    if (application.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    res.json(application);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   POST api/applications
// @desc    Create a new application
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { job, coverLetter, resume } = req.body;
    
    // Create application object
    const newApplication = new Application({
      user: req.user.id,
      job,
      coverLetter,
      resume,
      status: 'pending'
    });
    
    const application = await newApplication.save();
    
    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/applications/:id/status
// @desc    Update application status
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    // Find the application
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }
    
    // Check user ownership
    if (application.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    // Update status
    application.status = status;
    
    await application.save();
    
    res.json(application);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/applications/:id
// @desc    Delete an application
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }
    
    // Check user ownership
    if (application.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    await application.remove();
    
    res.json({ msg: 'Application removed' });
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

module.exports = router; 