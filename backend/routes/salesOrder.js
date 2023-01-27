const SalesOrder = require('@models/SalesOrder');
async function getSalesOrders(req, res) {
  try {
    const so = await SalesOrder.find({
      organizationId: req.query.organizationId,
    })
      .populate('customer')
      .populate('products.product');
    res.send(so);
  } catch (error) {
    res.send(error);
  }
}
async function getSalesOrder(req, res) {
  try {
    const so = await SalesOrder.findById(req.body.id);
    res.send(so);
  } catch (error) {
    res.send(error);
  }
}
async function createSalesOrder(req, res) {
  try {
    const so = await SalesOrder.create(req.body);
    res.send(so);
  } catch (error) {
    res.send(error);
  }
}
async function updateSalesOrder(req, res) {
  try {
    const so = await SalesOrder.updateOne({ _id: req.body._id }, req.body);
    res.send(`${so.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
}
async function deleteSalesOrder(req, res) {
  try {
    const so = await SalesOrder.deleteOne({ _id: req.query.id });
    res.send(`${so.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
}
module.exports = {
  getSalesOrders,
  getSalesOrder,
  createSalesOrder,
  updateSalesOrder,
  deleteSalesOrder,
};
