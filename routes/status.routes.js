const { addNewStatus, findByIdStatus, updateStatus, deleteStatus, findAllStatus } = require("../controllers/status.controller");

const router = require("express").Router();

router.post("/", addNewStatus);
router.get("/", findAllStatus);
router.get("/:id", findByIdStatus);
router.put("/:id", updateStatus);
router.delete("/:id", deleteStatus);

module.exports = router;
