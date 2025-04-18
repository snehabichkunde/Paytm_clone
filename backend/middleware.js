const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("JWT_SECRET in middleware:", JWT_SECRET);
    // console.log("Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Missing or invalid Authorization header");
        return res.status(403).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(' ')[1];
    // console.log("Token:", token);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log("Decoded token:", decoded);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        return res.status(403).json({ message: "Invalid token", error: err.message });
    }
};

module.exports = { authMiddleware };