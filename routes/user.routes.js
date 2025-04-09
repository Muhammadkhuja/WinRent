const {
  addNewUser,
  findAllUsers,
  findByIdUser,
  updateUser,
  deleteUser,
  loginuser,
  logoutuser,
  refreshTokenuser,
  activateuser,
  registrUser,
  updatePassword,
} = require("../controllers/user.controller");
const authGuard = require("../middleware/guards/auth.guard");
const clientGuard = require("../middleware/guards/client.guard");
const clientSelfGuard = require("../middleware/guards/client.self.guard");
const userAdminGuard = require("../middleware/guards/admin.guard");
const User = require("../models/user.models");

const router = require("express").Router();

router.post("/register", registrUser);
router.get("/activate/:link", activateuser);
router.post("/login", loginuser);
router.post("/logout", logoutuser);
router.post("/refresh", refreshTokenuser);

router.put("/newpassword",authGuard, updatePassword)
router.post("/", authGuard, userAdminGuard, addNewUser);
router.get("/", authGuard, userAdminGuard, findAllUsers);
router.get("/:id", authGuard, clientGuard, clientSelfGuard(User), findByIdUser);
router.put("/:id", authGuard, clientGuard, clientSelfGuard(User), updateUser);
router.delete("/:id", authGuard, userAdminGuard, deleteUser);

module.exports = router;
