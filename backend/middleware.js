const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.header("Authorization");

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
        req.userID = decoded.userID; // Attach userID to request
        next(); // Move to the next middleware
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
