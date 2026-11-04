const prisma = require('../lib/prisma');

const getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
  res.status(200).json(products);
};

module.exports = getAllProducts;
