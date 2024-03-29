const Customer = require('@models/Customer');
async function getCustomers(req, res) {
  try {
    const org = await Customer.find({
      organizationId: req.query.organizationId,
    });
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
async function customersGraphData(req, res) {
  try {
    const customers = await Customer.find({
      organizationId: req.query.organizationId,
    }).sort([['created_at', -1]]);
    const r = customers.map((e) => e.created_at);
    var arr = [];
    for (let i = 1; i <= 12; i++) {
      const w = r
        .map((d) => {
          return new Date(d).toLocaleDateString();
        })
        .filter(
          (x) =>
            x.startsWith(`${i}/`) && x.endsWith(`${new Date().getFullYear()}`)
        ).length;
      arr.push(w);
    }
    res.send(arr);
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
    const customer = await Customer.updateOne({ _id: req.body._id }, req.body);
    res.send(`${customer.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
}
async function deleteCustomer(req, res) {
  try {
    const customer = await Customer.deleteOne({ _id: req.query.id });
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
  customersGraphData,
};
