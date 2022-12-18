const User = require('@models/User');
const bcrypt = require('bcrypt');
const { createToken } = require('../helpers/jwt');

function home(req, res) {
  res.send('Employee Invoice Backend is running');
}

async function register(req, res) {
  const { password, ...rest } = req.body;
  try {
    const hash = bcrypt.hash(password, 10);
    const data = { password: hash, ...rest };
    const user = await User.create(data);
    const token = await createToken(user);
    res.send({ token, ...user });
  } catch (error) {
    res.send(error);
  }
}
async function login(req, res) {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    const check = bcrypt.compare(password, user.password);
    const token = await createToken(user);
    if (check) res.status(200).send(token);
    else res.status(404).send('User not Found');
  } catch (error) {
    res.send(error);
  }
}
async function resetPassword(req, res) {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const up = await User.updateOne({ email }, { password });
      res.status(200).send(`${up.modifiedCount} Item Successfully Modified`);
    } else {
      res.status(404).send('User not Found');
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = { register, login, resetPassword, home };
