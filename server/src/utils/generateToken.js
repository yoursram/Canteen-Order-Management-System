const jwt = require('jsonwebtoken');
const env = require('../config/env');

/**
 * Generate JWT token for authenticated user
 * @param {Object} payload - User identification payload { id, email, role }
 */
const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
};

module.exports = generateToken;
