var express = require('express');
var router = express.Router();
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserByOrg,
} = require('./user');
const {
  getEstimates,
  getEstimate,
  createEstimate,
  updateEstimate,
  deleteEstimate,
} = require('./estimate');
const {
  deleteSalesOrder,
  updateSalesOrder,
  createSalesOrder,
  getSalesOrder,
  getSalesOrders,
} = require('./salesOrder');
const {
  getInvoices,
  deleteInvoice,
  updateInvoice,
  createInvoice,
  getInvoice,
} = require('./invoice');
const {
  deleteProduct,
  updateProduct,
  getProducts,
  getProduct,
  createProduct,
} = require('./product');
const {
  deleteCustomer,
  updateCustomer,
  createCustomer,
  getCustomers,
  getCustomer,
} = require('./customer');
const {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} = require('./organization');
const { register, login, resetPassword, home } = require('./auth');

/* GET home page. */
router.get('/', home);

//Authentication
/* Register User */

router.post('/register', register);

/* Login User */

router.post('/login', login);

/* Reset User Password */

router.post('/reset-password', resetPassword);

//Users
/* GET users */
router.get('/users', getUsers);

/* GET User */
router.get('/user', getUser);

/* GET User By OrganizationId */
router.get('/userOrg', getUserByOrg);

/* UPDATE User */
router.patch('/user', updateUser);

/* DELETE User */
router.delete('/user', deleteUser);

// ESTIMATES
/* GET Estimates */
router.get('/estimates', getEstimates);

/* GET Estimate */
router.get('/estimate', getEstimate);

/* POST Estimate */
router.post('/estimate', createEstimate);

/* UPDATE Estimate */
router.patch('/estimate', updateEstimate);

/* DELETE Estimate */
router.delete('/estimate', deleteEstimate);

// SALES ORDERS
/* GET Sales Orders */
router.get('/sales-orders', getSalesOrders);

/* GET Sales Order */
router.get('/sales-order', getSalesOrder);

/* POST Sales Order */
router.post('/sales-order', createSalesOrder);

/* UPDATE Sales Order */
router.patch('/sales-order', updateSalesOrder);

/* DELETE Sales Order */
router.delete('/sales-order', deleteSalesOrder);

// INVOICES
/* GET Invoices */
router.get('/invoices', getInvoices);

/* GET Invoice */
router.get('/invoice', getInvoice);

/* POST Invoice */
router.post('/invoice', createInvoice);

/* UPDATE Invoice */
router.patch('/invoice', updateInvoice);

/* DELETE Invoice */
router.delete('/invoice', deleteInvoice);

// PRODUCTS
/* GET Products */
router.get('/products', getProducts);

/* GET Product */
router.get('/product', getProduct);

/* POST Product */
router.post('/product', createProduct);

/* UPDATE Product */
router.patch('/product', updateProduct);

/* DELETE Product */
router.delete('/product', deleteProduct);

// CUSTOMERS
/* GET Customers */
router.get('/customers', getCustomers);

/* GET Customer */
router.get('/customer', getCustomer);

/* POST Customer */
router.post('/customer', createCustomer);

/* UPDATE Customer */
router.patch('/customer', updateCustomer);

/* DELETE Customer */
router.delete('/customer', deleteCustomer);

// ORGANIZATIONS
/* GET Organizations */
router.get('/organizations', getOrganizations);

/* GET Organization */
router.get('/organization', getOrganization);

/* POST Organization */
router.post('/organization', createOrganization);

/* UPDATE Organization */
router.patch('/organization', updateOrganization);

/* DELETE Organization */
router.delete('/organization', deleteOrganization);

module.exports = router;
