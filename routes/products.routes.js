const { addNewProduct, findAllProducts, findByIdProduct, updateProduct, deleteProduct } = require("../controllers/products.controller");

const router = require("express").Router();

router.post("/", addNewProduct);
router.get("/", findAllProducts);
router.get("/:id", findByIdProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
