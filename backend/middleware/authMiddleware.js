const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // ✅ Check Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ VERY IMPORTANT: user set karo
      req.user = decoded; // { id: ... }

      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Not authorized ❌" });
    }
  } else {
    return res.status(401).json({ success: false, message: "No token ❌" });
  }
};

module.exports = protect;