const { addNewUser, findAllUsers, findByIdUser, updateUser, deleteUser } = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/", addNewUser);
router.get("/", findAllUsers);
router.get("/:id", findByIdUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
