const { addNewRentalPeriod, findAllRentalPeriods, findByIdRentalPeriod, updateRentalPeriod, deleteRentalPeriod } = require("../controllers/rentalperiods.controller");

const router = require("express").Router();

router.post("/", addNewRentalPeriod);
router.get("/", findAllRentalPeriods);
router.get("/:id", findByIdRentalPeriod);
router.put("/:id", updateRentalPeriod);
router.delete("/:id", deleteRentalPeriod);

module.exports = router;
