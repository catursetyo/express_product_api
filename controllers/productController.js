const products = require('../data/products');

const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

module.exports = { getAllProducts };
