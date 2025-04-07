const { addNewUser, findAllUsers, findByIdUser, updateUser, deleteUser, loginuser, logoutuser, refreshTokenuser, activateuser } = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/activate/:link", activateuser);
router.post("/login", loginuser);
router.post("/logout", logoutuser);
router.post("/refresh", refreshTokenuser)
router.post("/", addNewUser);
router.get("/", findAllUsers);
router.get("/:id", findByIdUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
