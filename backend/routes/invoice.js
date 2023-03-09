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
async function invoicesGraphData(req, res) {
  try {
    const invoices = await Invoice.find({
      organizationId: req.query.organizationId,
    }).sort([['created_at', -1]]);
    const r = invoices.map((e) => e.created_at);
    console.log(r);
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
  invoicesGraphData,
};
