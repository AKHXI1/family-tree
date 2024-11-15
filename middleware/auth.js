const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    // Get the token from the Authorization header
    const token = req.headers['authorization'];

    // If no token is provided, return a 401 error
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user ID to the request object
        req.userId = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If the token is invalid, return a 401 error
        res.status(401).json({ msg: 'Invalid token' });
    }
}

module.exports = auth;
