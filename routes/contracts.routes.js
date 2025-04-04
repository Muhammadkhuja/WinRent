const { addNewContract, findAllContracts, findByIdContract, updateContract, deleteContract } = require("../controllers/contracts.controller");

const router = require("express").Router();

router.post("/", addNewContract);
router.get("/", findAllContracts);
router.get("/:id", findByIdContract);
router.put("/:id", updateContract);
router.delete("/:id", deleteContract);

module.exports = router;
