const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!product) {
    return res.status(404).json({ message: 'produk tidak ditemukan' });
  }

  res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: { name: req.body.name, price: req.body.price },
  });

  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const id = Number(req.body.id);
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

const deleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return res.status(404).json({ message: 'produk tidak ditemukan' });
  }

  await prisma.product.delete({ where: { id } });
  res.status(200).json({ message: 'produk berhasil dihapus' });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
