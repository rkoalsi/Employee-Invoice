const Organization = require('@models/Organization');
async function getOrganizations(req, res) {
  try {
    const org = await Organization.find();
    res.send(org);
  } catch (error) {
    res.send(error);
  }
}
async function getOrganization(req, res) {
  try {
    const org = await Organization.findById(req.body.id);
    res.send(org);
  } catch (error) {
    res.send(error);
  }
}
async function createOrganization(req, res) {
  try {
    const org = await Organization.create(req.body);
    res.send(org);
  } catch (error) {
    res.send(error);
  }
}
async function updateOrganization(req, res) {
  try {
    const org = await Organization.updateOne({ _id: req.body.id }, req.body);
    res.send(`${org.modifiedCount} Item Successfully Modified`);
  } catch (error) {
    res.send(error);
  }
}
async function deleteOrganization(req, res) {
  try {
    const org = await Organization.deleteOne({ _id: req.body.id });
    res.send(`${org.deletedCount} Item Successfully Deleted`);
  } catch (error) {
    res.send(error);
  }
}
module.exports = {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
