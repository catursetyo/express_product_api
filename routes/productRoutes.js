const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
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
