const SalesOrder = require('@models/SalesOrder');
const Product = require('@models/Product');
const Invoice = require('../models/Invoice');
const Estimate = require('../models/Estimate');
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
//Added stock updation functionality
async function createSalesOrder(req, res) {
  const { products } = req.body;
  try {
    const so = await SalesOrder.create(req.body);
    const productIds = products.map((p) => p.product);
    productIds.map(async (p, i) => {
      const product = await Product.findOne({ _id: p });
      await Product.updateOne(
        { _id: p },
        { stock: product.stock - products[i].amount }
      );
    });
    res.send(so);
  } catch (error) {
    res.send(error);
  }
}

async function salesOrdersGraphData(req, res) {
  try {
    const salesOrders = await SalesOrder.find({
      organizationId: req.query.organizationId,
    }).sort([['created_at', -1]]);
    const r = salesOrders.map((e) => e.created_at);
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
    const inv = await Invoice.find({ salesOrder: req.query.id });
    const est = await Estimate.find({ salesOrder: req.query.id });
    if (inv.length > 0) {
      res.send(
        `Cannot Delete Sales Order as it is linked to Invoice - ${inv[0]._id}`
      );
    }

    if (inv.length === 0) {
      if (est.length > 0) {
        await Promise.all(
          est.map(async (i) => {
            await Estimate.updateOne(
              { _id: i._id },
              { $unset: { salesOrder: 1 } }
            );
          })
        );
      }
      const sO = await SalesOrder.findById(req.query.id);
      const productIds = sO.products.map((p) => p.product);
      productIds.map(async (p, i) => {
        const product = await Product.findOne({ _id: p });
        await Product.updateOne(
          { _id: p },
          { stock: product.stock + sO.products[i].amount }
        );
      });
      const so = await SalesOrder.deleteOne({ _id: req.query.id });
      res.send(`${so.deletedCount} Item Successfully Deleted`);
    }
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
  salesOrdersGraphData,
};
