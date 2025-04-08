const {
  addNewStatus,
  findByIdStatus,
  updateStatus,
  deleteStatus,
  findAllStatus,
} = require("../controllers/status.controller");
const adminGuard = require("../middleware/guards/admin.guard");
const authGuard = require("../middleware/guards/auth.guard");

const router = require("express").Router();

router.post("/", authGuard,adminGuard, addNewStatus);
router.get("/", authGuard, adminGuard, findAllStatus);
router.get("/:id", authGuard, adminGuard, findByIdStatus);
router.put("/:id", authGuard, adminGuard, updateStatus);
router.delete("/:id", authGuard, adminGuard, deleteStatus);

module.exports = router;
