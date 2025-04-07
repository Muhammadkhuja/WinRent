const { addNewOwner, findAllOwners, findByIdOwner, updateOwner, deleteOwner, loginowner, logoutowner, refreshTokenowner, activateOwner } = require("../controllers/owner.controller");

const router = require("express").Router();

router.get("/activate/:link", activateOwner);
router.post("/login", loginowner);
router.post("/logout", logoutowner);
router.post("/refresh", refreshTokenowner);
router.post("/", addNewOwner);
router.get("/", findAllOwners);
router.get("/:id", findByIdOwner);
router.put("/:id", updateOwner);
router.delete("/:id", deleteOwner);

module.exports = router;
