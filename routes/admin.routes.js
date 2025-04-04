const { addNewAdmin, findAllAdmin, findByIdAdmin, updateAdmin, deleteAdmin, loginadmin, logoutadmin, refreshTokenadmin } = require("../controllers/admin.controller");

const router = require("express").Router();

router.post("/login", loginadmin);
router.post("/logout", logoutadmin);
router.post("/refresh", refreshTokenadmin);
router.post("/", addNewAdmin);
router.get("/", findAllAdmin);
router.get("/:id", findByIdAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
