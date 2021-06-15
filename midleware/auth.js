// Middleware is a function that deals with request-response cycle, req-res onbject, checking whether there is a token in the header
// For token verification
const jwt = require('jsonwebtoken');
// Access to the secret
const config = require('config');

module.exports = function (req, res, next) {
  // "next" purpose -> moving on in the middleware function
  // Get token from the header
  //   The key to the token in the header
  const token = req.header('x-auth-token');
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    //   Verifying the token, the payload will be put into the decoded variable
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Setting the user token that exist in that payload so that user would gain access
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
