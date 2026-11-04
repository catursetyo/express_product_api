const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const validateProduct = (body) => {
  if (typeof body.name !== 'string' || body.name.trim() === '') {
    return 'name wajib diisi';
  }

  if (!Number.isInteger(body.price) || body.price < 0) {
    return 'price wajib berupa bilangan bulat minimal 0';
  }

  return null;
};

const getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ message: 'id tidak valid' });
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return res.status(404).json({ message: 'produk tidak ditemukan' });
  }

  res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const error = validateProduct(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  const product = await prisma.product.create({
    data: { name: req.body.name.trim(), price: req.body.price },
  });

  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const id = parseId(req.body.id);

  if (id === null) {
    return res.status(400).json({ message: 'id tidak valid' });
  }

  const error = validateProduct(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return res.status(404).json({ message: 'produk tidak ditemukan' });
  }

  const updated = await prisma.product.update({
    where: { id },
    data: { name: req.body.name.trim(), price: req.body.price },
  });

  res.status(200).json(updated);
};

const deleteProduct = async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ message: 'id tidak valid' });
  }

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
