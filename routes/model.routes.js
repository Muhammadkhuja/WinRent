const {
  addNewModel,
  findAllModels,
  findByIdModel,
  updateModel,
  deleteModel,
} = require("../controllers/model.controller");
const adminGuard = require("../middleware/guards/admin.guard");
const authGuard = require("../middleware/guards/auth.guard");
const ownerGuard = require("../middleware/guards/owner.guard");
const ownerSelfGuard = require("../middleware/guards/owner.self.guard");

const router = require("express").Router();

router.post("/", authGuard, ownerGuard, adminGuard, addNewModel);
router.get("/", authGuard, findAllModels);
router.get("/:id", authGuard, findByIdModel);
router.put("/:id", authGuard, ownerGuard, adminGuard, updateModel);
router.delete("/:id", authGuard, ownerGuard, adminGuard, deleteModel);

module.exports = router;
