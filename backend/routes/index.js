var express = require('express');
var router = express.Router();
const Customer = require('@models/Customer');
const Product = require('@models/Product');
const Organization = require('@models/Organization');
const Invoice = require('@models/Invoice');
const SalesOrder = require('@models/SalesOrder');
const Estimate = require('@models/Estimate');
const User = require('@models/User');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Employee Invoice Backend is running');
});

//Users
/* GET users */
router.get('/users', async function (req, res, next) {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});
/* GET User */
router.get('/user', async function (req, res, next) {
  try {
    const user = await User.findById(req.body.id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});
/* POST User */
router.post('/user', async function (req, res, next) {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

/* UPDATE User */
router.patch('/user', async function (req, res, next) {
  try {
    const user = await User.updateOne({ _id: req.body.id }, req.body);
    res.send(`${user.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
});

/* DELETE User */
router.delete('/user', async function (req, res, next) {
  try {
    const user = await User.deleteOne({ _id: req.body.id });
    res.send(`${user.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
});
// ESTIMATES
/* GET Estimates */
router.get('/estimates', async function (req, res, next) {
  try {
    const est = await Estimate.find();
    res.send(est);
  } catch (error) {
    res.send(error);
  }
});
/* GET Estimate */
router.get('/estimate', async function (req, res, next) {
  try {
    const est = await Estimate.findById(req.body.id);
    res.send(est);
  } catch (error) {
    res.send(error);
  }
});
/* POST Estimate */
router.post('/estimate', async function (req, res, next) {
  try {
    const est = await Estimate.create(req.body);
    res.send(est);
  } catch (error) {
    res.send(error);
  }
});

/* UPDATE Estimate */
router.patch('/estimate', async function (req, res, next) {
  try {
    const est = await Estimate.updateOne({ _id: req.body.id }, req.body);
    res.send(`${est.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
});

/* DELETE Estimate */
router.delete('/estimate', async function (req, res, next) {
  try {
    const est = await Estimate.deleteOne({ _id: req.body.id });
    res.send(`${est.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
});

// SALES ORDERS
/* GET Sales Orders */
router.get('/sales-orders', async function (req, res, next) {
  try {
    const so = await SalesOrder.find();
    res.send(so);
  } catch (error) {
    res.send(error);
  }
});
/* GET Sales Order */
router.get('/sales-order', async function (req, res, next) {
  try {
    const so = await SalesOrder.findById(req.body.id);
    res.send(so);
  } catch (error) {
    res.send(error);
  }
});
/* POST Sales Order */
router.post('/sales-order', async function (req, res, next) {
  try {
    const so = await SalesOrder.create(req.body);
    res.send(so);
  } catch (error) {
    res.send(error);
  }
});

/* UPDATE Sales Order */
router.patch('/sales-order', async function (req, res, next) {
  try {
    const so = await SalesOrder.updateOne({ _id: req.body.id }, req.body);
    res.send(`${so.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
});

/* DELETE Sales Order */
router.delete('/sales-order', async function (req, res, next) {
  try {
    const so = await SalesOrder.deleteOne({ _id: req.body.id });
    res.send(`${so.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
});
// INVOICES
/* GET Invoices */
router.get('/invoices', async function (req, res, next) {
  try {
    const inv = await Invoice.find();
    res.send(inv);
  } catch (error) {
    res.send(error);
  }
});
/* GET Invoice */
router.get('/invoice', async function (req, res, next) {
  try {
    const inv = await Invoice.findById(req.body.id);
    res.send(inv);
  } catch (error) {
    res.send(error);
  }
});
/* POST Invoice */
router.post('/invoice', async function (req, res, next) {
  try {
    const inv = await Invoice.create(req.body);
    res.send(inv);
  } catch (error) {
    res.send(error);
  }
});

/* UPDATE Invoice */
router.patch('/invoice', async function (req, res, next) {
  try {
    const inv = await Invoice.updateOne({ _id: req.body.id }, req.body);
    res.send(`${inv.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
});

/* DELETE Invoice */
router.delete('/invoice', async function (req, res, next) {
  try {
    const inv = await Invoice.deleteOne({ _id: req.body.id });
    res.send(`${inv.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
});

// PRODUCTS
/* GET Products */
router.get('/products', async function (req, res, next) {
  try {
    const prd = await Product.find();
    res.send(prd);
  } catch (error) {
    res.send(error);
  }
});
/* GET Product */
router.get('/product', async function (req, res, next) {
  try {
    const prd = await Product.findById(req.body.id);
    res.send(prd);
  } catch (error) {
    res.send(error);
  }
});
/* POST Product */
router.post('/product', async function (req, res, next) {
  try {
    const prd = await Product.create(req.body);
    res.send(prd);
  } catch (error) {
    res.send(error);
  }
});

/* UPDATE Product */
router.patch('/product', async function (req, res, next) {
  try {
    const product = await Product.updateOne({ _id: req.body.id }, req.body);
    res.send(`${product.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
});

/* DELETE Product */
router.delete('/product', async function (req, res, next) {
  try {
    const product = await Product.deleteOne({ _id: req.body.id });
    res.send(`${product.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
});

// CUSTOMERS
/* GET Customers */
router.get('/customers', async function (req, res, next) {
  try {
    const org = await Customer.find();
    res.send(org);
  } catch (error) {
    res.send(error);
  }
});
/* GET Customer */
router.get('/customer', async function (req, res, next) {
  try {
    const customer = await Customer.findById(req.body.id);
    res.send(customer);
  } catch (error) {
    res.send(error);
  }
});
/* POST Customer */
router.post('/customer', async function (req, res, next) {
  try {
    const customer = await Customer.create(req.body);
    res.send(customer);
  } catch (error) {
    res.send(error);
  }
});

/* UPDATE Customer */
router.patch('/customer', async function (req, res, next) {
  try {
    const customer = await Customer.updateOne({ _id: req.body.id }, req.body);
    res.send(`${customer.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
});

/* DELETE Customer */
router.delete('/customer', async function (req, res, next) {
  try {
    const customer = await Customer.deleteOne({ _id: req.body.id });
    res.send(`${customer.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
});

// ORGANIZATIONS
/* GET Organizations */
router.get('/organizations', async function (req, res, next) {
  try {
    const org = await Organization.find();
    res.send(org);
  } catch (error) {
    res.send(error);
  }
});
/* GET Organization */
router.get('/organization', async function (req, res, next) {
  try {
    const org = await Organization.findById(req.body.id);
    res.send(org);
  } catch (error) {
    res.send(error);
  }
});
/* POST Organization */
router.post('/organization', async function (req, res, next) {
  try {
    const org = await Organization.create(req.body);
    res.send(org);
  } catch (error) {
    res.send(error);
  }
});

/* UPDATE Organization */
router.patch('/organization', async function (req, res, next) {
  try {
    const org = await Organization.updateOne({ _id: req.body.id }, req.body);
    res.send(`${org.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
});

/* DELETE Organization */
router.delete('/organization', async function (req, res, next) {
  try {
    const org = await Organization.deleteOne({ _id: req.body.id });
    res.send(`${org.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
