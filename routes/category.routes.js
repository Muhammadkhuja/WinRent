const { addNewCategory, findAllCategories, findByIdCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");

const router = require("express").Router();

router.post("/", addNewCategory);
router.get("/", findAllCategories);
router.get("/:id", findByIdCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
