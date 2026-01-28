const jwt = require('jsonwebtoken');
const { JWT } = require('../config/env');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Bearer token is missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }
    const decoded = jwt.verify(token, JWT);

    req.user = decoded; 
    next();
  } catch (err) {
    console.error("Actual error:", err);
    return res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
};
