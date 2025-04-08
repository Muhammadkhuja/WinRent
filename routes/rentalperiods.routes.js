const {
  addNewRentalPeriod,
  findAllRentalPeriods,
  findByIdRentalPeriod,
  updateRentalPeriod,
  deleteRentalPeriod,
} = require("../controllers/rentalperiods.controller");
const adminGuard = require("../middleware/guards/admin.guard");
const authGuard = require("../middleware/guards/auth.guard");
const ownerGuard = require("../middleware/guards/owner.guard");
const ownerSelfGuard = require("../middleware/guards/owner.self.guard");

const router = require("express").Router();

router.post("/", authGuard,adminGuard, addNewRentalPeriod);
router.get("/", authGuard, adminGuard, findAllRentalPeriods);
router.get("/:id", authGuard, adminGuard,ownerGuard, ownerSelfGuard, findByIdRentalPeriod);
router.put("/:id", authGuard, adminGuard, updateRentalPeriod);
router.delete("/:id", authGuard, adminGuard, deleteRentalPeriod);

module.exports = router;
