const jwt = require('json-web-token');

require('dotenv').config();

const createToken = async (data) => {
  const token = await jwt.encode(data, process.env.SECRET);
  return token;
};

const verifyToken = async (token) => {
  const verified = await jwt.decode(token, process.env.SECRET);
  return verified;
};

module.exports = { createToken, verifyToken };
