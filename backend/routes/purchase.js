const Customer = require('@models/Customer');
const Estimate = require('../models/Estimate');
const Product = require('../models/Product');
const SalesOrder = require('../models/SalesOrder');
const Invoice = require('../models/Invoice');
const { emailInvoice } = require('./invoice');

async function createPurchase(req, res) {
  const {
    name,
    email,
    phone,
    organizationId,
    address,
    productId,
    total,
    amount,
    createdBy,
  } = req.body;
  const products = [{ product: productId, amount }];
  try {
    const cust = await Customer.findOne({ email });
    var customer = {};
    if (!cust) {
      customer = await Customer.create({
        name,
        email,
        phone,
        organizationId,
        shop: address,
      });
    } else {
      customer = cust;
    }

    const est = await Estimate.create({
      customer: customer._id,
      createdBy,
      products,
      organizationId,
      total,
    });
    const so = await SalesOrder.create({
      customer: customer._id,
      createdBy,
      products,
      organizationId,
      total,
      estimate: est._id,
    });
    const productIds = products.map((p) => p.product);
    productIds.map(async (p, i) => {
      const product = await Product.findOne({ _id: p });
      await Product.updateOne(
        { _id: p },
        { stock: product.stock - products[i].amount }
      );
    });
    const inv = await Invoice.create({
      customer: customer._id,
      createdBy,
      products,
      organizationId,
      total,
      estimate: est._id,
      salesOrder: so._id,
    });
    await SalesOrder.updateOne({ _id: so._id }, { invoice: inv._id });
    await Estimate.updateOne(
      { _id: est._id },
      { salesOrder: so._id, invoice: inv._id }
    );
    delete req.body;
    req.body = { id: inv._id, email: customer.email };
    res.send(`Product Purchased. Email Sent.`);
    await emailInvoice(req, res);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  createPurchase,
};
