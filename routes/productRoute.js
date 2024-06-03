const express = require("express");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getById,
} = require("../controllers/productController");

const router = express.Router();

router.post('/add', upload.array('images', 10), createProduct);
router.get('/get', getProducts);
router.get('/getById/:ID', getById);
router.delete('/delete/:ID', deleteProduct);
router.put('/update/:ID', upload.array('images', 10), updateProduct);

module.exports = router;
