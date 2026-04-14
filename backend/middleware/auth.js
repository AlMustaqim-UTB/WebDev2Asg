const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Extract the JWT token from the request cookies
  const token = req.cookies?.token;

  // Check if no token exists
  if (!token) {
    return res.status(401).json({ msg: "No token found" });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user information to the request object
    req.user = decoded.user;
    
    // Proceed to the next route handler
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};