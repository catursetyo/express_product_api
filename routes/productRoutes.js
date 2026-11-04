const express = require('express');
const getAllProducts = require('../controllers/getAllProducts');
const getProductById = require('../controllers/getProductById');
const createProduct = require('../controllers/createProduct');
const updateProduct = require('../controllers/updateProduct');
const deleteProduct = require('../controllers/deleteProduct');
const {
  validateIdParam,
  validateIdBody,
  validateProduct,
} = require('../middlewares/productMiddleware');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', validateIdParam, getProductById);
router.post('/', validateProduct, createProduct);
router.put('/', validateIdBody, validateProduct, updateProduct);
router.delete('/:id', validateIdParam, deleteProduct);

module.exports = router;
