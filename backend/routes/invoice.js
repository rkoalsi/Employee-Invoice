const Invoice = require('@models/Invoice');
async function getInvoices(req, res) {
  try {
    const inv = await Invoice.find({
      organizationId: req.query.organizationId,
    })
      .populate('customer')
      .populate('products.product');
    res.send(inv);
  } catch (error) {
    res.send(error);
  }
}

async function getInvoice(req, res) {
  try {
    const inv = await Invoice.findById(req.body.id);
    res.send(inv);
  } catch (error) {
    res.send(error);
  }
}
async function createInvoice(req, res) {
  try {
    const inv = await Invoice.create(req.body);
    res.send(inv);
  } catch (error) {
    res.send(error);
  }
}
async function updateInvoice(req, res) {
  try {
    const inv = await Invoice.updateOne({ _id: req.body._id }, req.body);
    res.send(`${inv.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
}
async function deleteInvoice(req, res) {
  try {
    const inv = await Invoice.deleteOne({ _id: req.query.id });
    res.send(`${inv.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
