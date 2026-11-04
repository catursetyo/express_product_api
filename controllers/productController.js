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

module.exports = { getAllProducts, getProductById, createProduct };
