const express = require("express");
const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct

//   getAllProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct
} = require("../controllers/productController");

const router = express.Router();

router.post('/add', createProduct);
router.get('/get',getProducts);
router.delete('/delete/:ID',deleteProduct);
router.put('/update/:ID',updateProduct)
// router.get("/", getAllProducts);
// router.get("/:id", getProductById);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

module.exports = router;
