const Estimate = require('@models/Estimate');
const Invoice = require('../models/Invoice');

async function getEstimates(req, res) {
  try {
    const est = await Estimate.find({
      organizationId: req.query.organizationId,
    })
      .populate('customer')
      .populate('products.product');
    res.send(est);
  } catch (error) {
    res.send(error);
  }
}
async function createEstimate(req, res) {
  try {
    const est = await Estimate.create(req.body);
    res.send(est);
    console.log(est);
  } catch (error) {
    res.send(error);
  }
}
async function getEstimate(req, res) {
  try {
    const est = await Estimate.findById(req.body.id);
    res.send(est);
  } catch (error) {
    res.send(error);
  }
}
async function estimatesGraphData(req, res) {
  try {
    const estimates = await Estimate.find({
      organizationId: req.query.organizationId,
    }).sort([['created_at', -1]]);
    const r = estimates.map((e) => e.created_at);
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
async function updateEstimate(req, res) {
  try {
    const est = await Estimate.updateOne({ _id: req.body._id }, req.body);
    res.send(`${est.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
}
async function deleteEstimate(req, res) {
  try {
    const est = await Estimate.find({ _id: req.query.id });
    if (est[0].invoice && est[0].salesOrder) {
      res.send(
        `Cannot Delete Estimate as it is linked to Invoice - ${est[0].invoice} and Sales Order ${est[0].salesOrder}`
      );
    }
    if (est[0].invoice) {
      res.send(
        `Cannot Delete Estimate as it is linked to Invoice ${est[0].invoice}`
      );
    }
    if (est[0].salesOrder) {
      res.send(
        `Cannot Delete Estimate as it is linked to Sales Order ${est[0].salesOrder}`
      );
    }
    if (!est[0].salesOrder && !est[0].invoice) {
      const est2 = await Estimate.deleteOne({ _id: req.query.id });
      res.send(`${est2.deletedCount} Item Successfully Deleted`);
    }
  } catch (error) {
    res.send(error);
  }
}
module.exports = {
  getEstimates,
  getEstimate,
  createEstimate,
  updateEstimate,
  deleteEstimate,
  estimatesGraphData,
};
