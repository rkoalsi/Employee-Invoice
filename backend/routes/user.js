const User = require('@models/User');

async function getUsers(req, res) {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
}
async function getUser(req, res) {
  try {
    const user = await User.findById(req.body.id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const user = await User.updateOne({ _id: req.body.id }, req.body);
    res.send(`${user.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
}
async function deleteUser(req, res, next) {
  try {
    const user = await User.deleteOne({ _id: req.body.id });
    res.send(`${user.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
}
module.exports = { getUsers, getUser, updateUser, deleteUser };
