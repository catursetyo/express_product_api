const prisma = require('../lib/prisma');

const updateProduct = async (req, res) => {
  const id = req.body.id;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return res.status(404).json({ message: 'produk tidak ditemukan' });
  }

  const updated = await prisma.product.update({
    where: { id },
    data: { name: req.body.name, price: req.body.price },
  });

  res.status(200).json(updated);
};

module.exports = updateProduct;
