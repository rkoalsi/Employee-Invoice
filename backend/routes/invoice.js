const Invoice = require('@models/Invoice');
const { generateInvoice } = require('../helpers/invoice');
const { sendMail } = require('../helpers/mail');
const Estimate = require('../models/Estimate');
const SalesOrder = require('../models/SalesOrder');

var data = {
  client: {
    company: 'Client Corp',
    country: 'India',
  },
  sender: {
    company: 'Employee Invoicing',
    address: 'Bandra W',
    zip: '400104',
    city: 'Mumbai',
    country: 'India',
  },
  images: {
    logo: 'https://public.easyinvoice.cloud/img/logo_en_original.png',
  },
  information: {
    // Invoice number
    number: '2021.0001',
    // Invoice data
    date: new Date().toDateString().slice(3),
    // Invoice due date
    'due-date': new Date(
      1900 + new Date().getYear(),
      new Date().getMonth() + 1,
      0
    )
      .toDateString()
      .slice(3),
  },
  products: [
    {
      quantity: '2',
      description: 'Test1',
      'tax-rate': 6,
      price: 33.87,
    },
    {
      quantity: '4',
      description: 'Test2',
      'tax-rate': 21,
      price: 10.45,
    },
  ],
  bottomNotice: 'Kindly pay your invoice within 15 days.',
  settings: {
    currency: 'INR',
    'tax-notation': 'gst',
  },
  translate: {},

  customize: {},
};
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
    const so = await SalesOrder.find({ invoice: req.query.id });
    const est = await Estimate.find({ invoice: req.query.id });
    if (so.length > 0) {
      await Promise.all(
        so.map(async (i) => {
          await SalesOrder.updateOne(
            { _id: i._id },
            { $unset: { invoice: 1 } }
          );
        })
      );
    }
    if (est.length > 0) {
      await Promise.all(
        est.map(async (i) => {
          await Estimate.updateOne({ _id: i._id }, { $unset: { invoice: 1 } });
        })
      );
    }
    const inv = await Invoice.deleteOne({ _id: req.query.id });
    res.send(`${inv.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
}

async function emailInvoice(req, res) {
  const { id, email } = req.body;
  try {
    const inv = await Invoice.findById(id)
      .populate('customer')
      .populate('products.product');
    const products = inv['products'].map((e) => {
      return {
        description: e.product.name,
        'tax-rate': e.product.gst,
        price: e.product.price,
        quantity: e.amount,
      };
    });
    data['products'] = products;
    data['client']['company'] = inv.customer.shop;
    data['information']['number'] = inv._id;
    generateInvoice(data);
    await sendMail({ to: email });
    await Invoice.updateOne({ _id: id }, { sentEmail: true });
    const inv2 = await Invoice.findById(id)
      .populate('customer')
      .populate('products.product');
    res.send(inv2);
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
  emailInvoice,
};
