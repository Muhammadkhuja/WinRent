const {
  addNewOwner,
  findAllOwners,
  findByIdOwner,
  updateOwner,
  deleteOwner,
  loginowner,
  logoutowner,
  refreshTokenowner,
  activateOwner,
  registrOwners,
  updatePassword,
} = require("../controllers/owner.controller");
const adminGuard = require("../middleware/guards/admin.guard");
const authGuard = require("../middleware/guards/auth.guard");
const ownerGuard = require("../middleware/guards/owner.guard");
const ownerSelfGuard = require("../middleware/guards/owner.self.guard");

const router = require("express").Router();

router.post("/registr", registrOwners);
router.get("/activate/:link", activateOwner);
router.post("/login", loginowner);
router.post("/logout", logoutowner);
router.post("/refresh", refreshTokenowner);

router.put("/ownerpassword", updatePassword)
router.post("/", authGuard,adminGuard, addNewOwner);
router.get("/", authGuard,adminGuard, findAllOwners);
router.get("/:id", authGuard,ownerGuard, ownerSelfGuard, findByIdOwner);
router.put("/:id", authGuard, ownerGuard, ownerSelfGuard, updateOwner);
router.delete("/:id", authGuard,adminGuard, deleteOwner);

module.exports = router;
