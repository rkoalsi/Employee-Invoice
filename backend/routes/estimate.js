const Estimate = require('@models/Estimate');

async function getEstimates(req, res) {
  try {
    const est = await Estimate.find({
      organizationId: req.query.organizationId,
    });
    res.send(est);
  } catch (error) {
    res.send(error);
  }
}
async function createEstimate(req, res) {
  try {
    const est = await Estimate.create(req.body);
    res.send(est);
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
async function updateEstimate(req, res) {
  try {
    const est = await Estimate.updateOne({ _id: req.body.id }, req.body);
    res.send(`${est.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
}
async function deleteEstimate(req, res) {
  try {
    const est = await Estimate.deleteOne({ _id: req.body.id });
    res.send(`${est.deletedCount} Item Successfully Deleted`);
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
};
