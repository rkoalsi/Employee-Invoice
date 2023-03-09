const Organization = require('@models/Organization');
const Product = require('@models/Product');
async function getOrganizations(req, res) {
  try {
    temp = [];
    const org = await Organization.find();
    let result = await Promise.all(
      org.map(async (i) => {
        const products = await Product.find({
          organizationId: i._id,
        });
        return {
          _id: i._id,
          name: i.name,
          gstin: i.gstin,
          location: i.location,
          created_at: i.created_at,
          updated_at: i.updated_at,
          __v: i.__v,
          products,
        };
      })
    );
    res.send(result);
  } catch (error) {
    res.send(error);
  }
}
async function getOrganization(req, res) {
  try {
    const org = await Organization.findById(req.query.id);
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
