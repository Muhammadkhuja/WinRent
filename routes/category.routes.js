const {
  addNewCategory,
  findAllCategories,
  findByIdCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/admin.guard");

const router = require("express").Router();

router.post("/", authGuard, userAdminGuard, addNewCategory);
router.get("/", authGuard, findAllCategories);
router.get("/:id", authGuard, findByIdCategory);
router.put("/:id", authGuard, userAdminGuard, updateCategory);
router.delete("/:id", authGuard, userAdminGuard, deleteCategory);

module.exports = router;
