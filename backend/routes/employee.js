const User = require('@models/User');
const bcrypt = require('bcrypt');

async function getEmployees(req, res) {
  try {
    const employees = await User.find({
      organizationId: req.query.organizationId,
    });
    res.send(employees);
  } catch (error) {
    res.send(error);
  }
}
async function employeesGraphData(req, res) {
  try {
    const employees = await User.find({
      organizationId: req.query.organizationId,
    }).sort([['created_at', -1]]);
    const r = employees.map((e) => e.created_at);
    var arr = [];
    for (let i = 1; i <= 12; i++) {
      const w = r
        .map((d) => {
          return new Date(d).toLocaleDateString();
        })
        .filter(
          (x) =>
            x.startsWith(`${i}`) && x.endsWith(`${new Date().getFullYear()}`)
        ).length;
      arr.push(w);
    }
    res.send(arr);
  } catch (error) {
    res.send(error);
  }
}
async function getEmployee(req, res) {
  try {
    const user = await User.findById(req.body.id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
}
async function createEmployee(req, res) {
  const password = Math.random().toString(36).substring(2, 8);
  try {
    const hash = await bcrypt.hash(password, 10);
    const data = { password: hash, ...req.body };
    const user = await User.create(data);
    res.send({ user, password });
  } catch (error) {
    res.send(error);
  }
}
async function updateEmployee(req, res, next) {
  try {
    const user = await User.updateOne({ _id: req.body._id }, req.body);
    res.send(`${user.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
}
async function deleteEmployee(req, res, next) {
  try {
    const user = await User.deleteOne({ _id: req.query.id });
    res.send(`${user.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
}
module.exports = {
  getEmployees,
  updateEmployee,
  deleteEmployee,
  createEmployee,
  getEmployee,
  employeesGraphData,
};
