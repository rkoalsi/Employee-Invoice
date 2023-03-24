var express = require('express');
var router = express.Router();
const { getUser, getUsers, updateUser, deleteUser } = require('./user');
const {
  getEstimates,
  getEstimate,
  createEstimate,
  updateEstimate,
  deleteEstimate,
  estimatesGraphData,
} = require('./estimate');
const {
  deleteSalesOrder,
  updateSalesOrder,
  createSalesOrder,
  getSalesOrder,
  getSalesOrders,
  salesOrdersGraphData,
} = require('./salesOrder');
const {
  getInvoices,
  deleteInvoice,
  updateInvoice,
  createInvoice,
  getInvoice,
  invoicesGraphData,
  emailInvoice,
} = require('./invoice');
const {
  deleteProduct,
  updateProduct,
  getProducts,
  getProduct,
  createProduct,
  productsGraphData,
} = require('./product');
const {
  deleteCustomer,
  updateCustomer,
  createCustomer,
  getCustomers,
  getCustomer,
  customersGraphData,
} = require('./customer');
const {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} = require('./organization');
const { register, login, resetPassword, home } = require('./auth');
const {
  getEmployees,
  deleteEmployee,
  updateEmployee,
  getEmployee,
  createEmployee,
  employeesGraphData,
} = require('./employee');
const { createPurchase } = require('./purchase');

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

/* UPDATE User */
router.patch('/user', updateUser);

/* DELETE User */
router.delete('/user', deleteUser);

//EMPLOYEES
/* GET Employees By OrganizationId */
router.get('/employees', getEmployees);

/* GET Employee */
router.get('/employee', getEmployee);

/* POST Employee */
router.post('/employee', createEmployee);

/* UPDATE Employee */
router.patch('/employee', updateEmployee);

/* DELETE Employee */
router.delete('/employee', deleteEmployee);

/* Employee Graph Data */
router.get('/employee-data', employeesGraphData);

// ESTIMATES
/* GET Estimates */
router.get('/estimates', getEstimates);

/* GET Estimate */
router.get('/estimate', getEstimate);

/* Estimate Graph Data */
router.get('/estimate-data', estimatesGraphData);

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

/* Sales Order Graph Data */
router.get('/sales-order-data', salesOrdersGraphData);

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

/* Invoice Graph Data */
router.get('/invoice-data', invoicesGraphData);

/* POST Invoice */
router.post('/invoice', createInvoice);

/* UPDATE Invoice */
router.patch('/invoice', updateInvoice);

/* DELETE Invoice */
router.delete('/invoice', deleteInvoice);

/* Email Invoice */
router.post('/email-invoice', emailInvoice);

// PRODUCTS
/* GET Products */
router.get('/products', getProducts);

/* GET Product */
router.get('/product', getProduct);

/* Product Graph Data */
router.get('/product-data', productsGraphData);

/* POST Product */
router.post('/product', createProduct);

/* UPDATE Product */
router.patch('/product', updateProduct);

/* DELETE Product */
router.delete('/product', deleteProduct);

// Purchase
/* POST Purchase */
router.post('/purchase', createPurchase);

// CUSTOMERS

/* GET Customers */
router.get('/customers', getCustomers);

/* GET Customer */
router.get('/customer', getCustomer);

/* Customer Graph Data */
router.get('/customer-data', customersGraphData);

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
