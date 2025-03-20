const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth, checkUserType } = require('../middleware/auth');
const userController = require('../controllers/userController');

// Validation middleware
const registerValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('userType')
        .isIn(['jobseeker', 'employer', 'admin'])
        .withMessage('Invalid user type'),
    body('name').notEmpty().withMessage('Name is required'),
    body('company')
        .if(body('userType').equals('employer'))
        .notEmpty()
        .withMessage('Company name is required for employers')
];

// Public routes
router.post('/register', registerValidation, userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.put('/change-password', auth, userController.changePassword);

// Admin routes
router.get('/users', auth, checkUserType(['admin']), userController.getAllUsers);
router.delete('/users/:id', auth, checkUserType(['admin']), userController.deleteUser);

module.exports = router; 