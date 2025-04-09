const {
  addNewAdmin,
  findAllAdmin,
  findByIdAdmin,
  updateAdmin,
  deleteAdmin,
  loginadmin,
  logoutadmin,
  refreshTokenadmin,
  activaeAdmin,
} = require("../controllers/admin.controller");
const authGuard = require("../middleware/guards/auth.guard");
const is_creatorGuard = require("../middleware/guards/is_creator.guard");

const router = require("express").Router();

router.get("/activate/:link", activaeAdmin);
router.post("/login", loginadmin);
router.post("/logout", logoutadmin);
router.post("/refresh", refreshTokenadmin);

router.post("/", authGuard, is_creatorGuard, addNewAdmin);
// router.post("/", addNewAdmin);
router.get("/", authGuard, findAllAdmin);
router.get("/:id", authGuard, findByIdAdmin);
router.put("/:id", authGuard, updateAdmin);
router.delete("/:id", authGuard, deleteAdmin);

module.exports = router;
