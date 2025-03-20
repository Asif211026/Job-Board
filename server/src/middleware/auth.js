const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate.' });
    }
};

const checkUserType = (allowedTypes) => {
    return (req, res, next) => {
        if (!allowedTypes.includes(req.user.userType)) {
            return res.status(403).json({ 
                message: 'Access denied. Insufficient permissions.' 
            });
        }
        next();
    };
};

module.exports = {
    auth,
    checkUserType
}; 