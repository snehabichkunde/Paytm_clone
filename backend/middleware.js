function authMiddleware(req, res, next) {
    console.log("authMiddleware is running"); // Debugging
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = { authMiddleware };
