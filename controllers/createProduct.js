const prisma = require('../lib/prisma');

const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: { name: req.body.name, price: req.body.price },
  });

  res.status(201).json(product);
};

module.exports = createProduct;
