const User = require('@models/User');
const bcrypt = require('bcrypt');
const { createToken } = require('../helpers/jwt');

function home(req, res) {
  res.send('Employee Invoice Backend is running');
}

async function register(req, res) {
  const { password, ...rest } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const data = { password: hash, ...rest };
    const user = await User.create(data);
    const token = await createToken(data.email);
    res.status(200).send({ token: token.value, user });
  } catch (error) {
    res.send(error);
  }
}
async function login(req, res) {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        const token = await createToken(user.email);
        res.status(200).send({ token: token.value, user });
      } else {
        res.status(400).send('Password is Incorrect');
      }
    } else {
      res.status(400).send('User not Found');
    }
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
