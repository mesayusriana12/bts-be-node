require('dotenv').config({ path: require('find-config')('.env') })
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  let token = req.header('Authorization')
  if (!token) return res.status(403).json({
    status: 403,
    message: 'Access Denied, Please Login First.'
  });
  
  token = token.replace('Bearer ', '');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: 'Token is invalid.'
    })
  }
};