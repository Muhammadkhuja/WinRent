const {
  addNewProduct,
  findAllProducts,
  findByIdProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const adminGuard = require("../middleware/guards/admin.guard");
const authGuard = require("../middleware/guards/auth.guard");
const ownerGuard = require("../middleware/guards/owner.guard");

const router = require("express").Router();

router.post("/", authGuard,ownerGuard,  addNewProduct);
router.get("/", authGuard, findAllProducts);
router.get("/:id", authGuard, findByIdProduct);
router.put("/:id", authGuard,ownerGuard,adminGuard, updateProduct);
router.delete("/:id", authGuard, ownerGuard, adminGuard, deleteProduct);

module.exports = router;
