const prisma = require('../lib/prisma');

const getProductById = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.productId },
  });

  if (!product) {
    return res.status(404).json({ message: 'produk tidak ditemukan' });
  }

  res.status(200).json(product);
};

module.exports = getProductById;
