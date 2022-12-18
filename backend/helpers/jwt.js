const jwt = require('json-web-token');

require('dotenv').config();

const createToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET);
  return token;
};

const verifyToken = (token) => {
  const verified = jwt.verify(token, process.env.SECRET);
  return verified;
};

module.exports = { createToken, verifyToken };
