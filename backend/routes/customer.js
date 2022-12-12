const Customer = require('@models/Customer');
async function getCustomers(req, res) {
  try {
    const org = await Customer.find();
    res.send(org);
  } catch (error) {
    res.send(error);
  }
}
async function getCustomer(req, res) {
  try {
    const customer = await Customer.findById(req.body.id);
    res.send(customer);
  } catch (error) {
    res.send(error);
  }
}
async function createCustomer(req, res) {
  try {
    const customer = await Customer.create(req.body);
    res.send(customer);
  } catch (error) {
    res.send(error);
  }
}
async function updateCustomer(req, res) {
  try {
    const customer = await Customer.updateOne({ _id: req.body.id }, req.body);
    res.send(`${customer.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
}
async function deleteCustomer(req, res) {
  try {
    const customer = await Customer.deleteOne({ _id: req.body.id });
    res.send(`${customer.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
}
module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
