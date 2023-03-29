const Product = require('@models/Product');
const Estimate = require('../models/Estimate');
const SalesOrder = require('../models/SalesOrder');
const Invoice = require('../models/Invoice');

async function getProducts(req, res) {
  try {
    const prd = await Product.find({
      organizationId: req.query.organizationId,
    });
    res.send(prd);
  } catch (error) {
    res.send(error);
  }
}
async function productsGraphData(req, res) {
  try {
    const products = await Product.find({
      organizationId: req.query.organizationId,
    }).sort([['created_at', -1]]);
    const r = products.map((e) => e.created_at);
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
async function getProduct(req, res) {
  try {
    const prd = await Product.findById(req.query.id);
    res.send(prd);
  } catch (error) {
    res.send(error);
  }
}
async function createProduct(req, res) {
  try {
    const prds = await Product.find({
      organizationId: req.body.organizationId,
    });
    const arr = prds.map((p) => p.name === req.body.name);
    if (arr.includes(true)) {
      res.status(400).json({
        error: `Cannot create product with duplicate name ${
          prds[arr.indexOf(true)].name
        }`,
      });
    } else {
      const prd = await Product.create(req.body);
      res.send(prd);
    }
  } catch (error) {
    res.send(error);
  }
}
async function updateProduct(req, res) {
  try {
    const product = await Product.updateOne({ _id: req.body._id }, req.body);
    res.send(`${product.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
}
async function deleteProduct(req, res) {
  try {
    const estimate = await Estimate.find({ 'products.product': req.query.id });
    const salesOrder = await SalesOrder.find({
      'products.product': req.query.id,
    });
    const invoice = await Invoice.find({ 'products.product': req.query.id });
    if (invoice.length > 0) {
      res.send(`Product Exists in an Invoice`);
    }
    if (salesOrder.length > 0) {
      res.send(`Product Exists in an Sales Order`);
    }
    if (estimate.length > 0) {
      res.send(`Product Exists in an Estimate`);
    } else {
      const product = await Product.deleteOne({ _id: req.query.id });
      res.send(`${product.deletedCount} Item Successfully Deleted`);
    }
  } catch (error) {
    res.send(error);
  }
}
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productsGraphData,
};
