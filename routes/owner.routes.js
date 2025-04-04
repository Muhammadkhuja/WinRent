const { addNewOwner, findAllOwners, findByIdOwner, updateOwner, deleteOwner } = require("../controllers/owner.controller");

const router = require("express").Router();

router.post("/", addNewOwner);
router.get("/", findAllOwners);
router.get("/:id", findByIdOwner);
router.put("/:id", updateOwner);
router.delete("/:id", deleteOwner);

module.exports = router;
