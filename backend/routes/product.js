const Product = require('@models/Product');

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

async function getProduct(req, res) {
  try {
    const prd = await Product.findById(req.body.id);
    res.send(prd);
  } catch (error) {
    res.send(error);
  }
}
async function createProduct(req, res) {
  try {
    const prd = await Product.create(req.body);
    res.send(prd);
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
    const product = await Product.deleteOne({ _id: req.query.id });
    res.send(`${product.deletedCount} Item Successfully Deleted`);
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
};
