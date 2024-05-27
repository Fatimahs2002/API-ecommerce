
const jwt = require('jsonwebtoken');

const generateToken = (id, role, fullName) => {
  const secret = process.env.JWT_SECRET; // Get the secret key from environment variables
  if (!secret) {
    throw new Error('JWT secret key is missing');
  }
  return jwt.sign({ id, role, fullName }, secret, { expiresIn: '1h' });
};

module.exports = generateToken;
