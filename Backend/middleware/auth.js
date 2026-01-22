const jwt = require("jsonwebtoken");

//@desc Middleware to verify JWT token and protect routes
const protect = (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (format: "Bearer <token>")
      token = req.headers.authorization.split(" ")[1];
javascript
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add user info to request object
      req.user = decoded.user;

      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

//@desc Middleware to check if user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

//@desc Middleware to check if user is vendor
const vendor = (req, res, next) => {
  if (req.user && (req.user.role === "vendor" || req.user.role === "admin")) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as a vendor" });
  }
};

module.exports = { protect, admin, vendor };
