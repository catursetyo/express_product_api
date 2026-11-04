const prisma = require('../lib/prisma');

const deleteProduct = async (req, res) => {
  const id = req.productId;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return res.status(404).json({ message: 'produk tidak ditemukan' });
  }

  await prisma.product.delete({ where: { id } });
  res.status(200).json({ message: 'produk berhasil dihapus' });
};

module.exports = deleteProduct;
