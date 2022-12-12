const User = require('@models/User');

async function register(req, res) {}
async function login(req, res) {}
async function resetPassword(req, res) {}
function home(req, res) {
  res.send('Employee Invoice Backend is running');
}
module.exports = { register, login, resetPassword, home };
