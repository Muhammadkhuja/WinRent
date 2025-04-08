const {
  addNewContract,
  findAllContracts,
  findByIdContract,
  updateContract,
  deleteContract,
  getRentedProducts,
  getCancelledClients,
  getDamagedClients,
  getTopOwnersByCategory,
} = require("../controllers/contracts.controller");
const adminGuard = require("../middleware/guards/admin.guard");
const authGuard = require("../middleware/guards/auth.guard");
const clientGuard = require("../middleware/guards/client.guard");
const clientSelfGuard = require("../middleware/guards/client.self.guard");
const Contracts = require("../models/contracts.model");

const router = require("express").Router();

router.get("/rented", getRentedProducts)
router.get("/canceled", getCancelledClients)
router.get("/damage", getDamagedClients)
router.get("/topowner", getTopOwnersByCategory)


router.post("/", authGuard,clientGuard, addNewContract);
router.get("/", authGuard,adminGuard, findAllContracts);
router.get("/:id", authGuard,clientGuard,clientSelfGuard(Contracts), findByIdContract);
router.put("/:id", authGuard,adminGuard, updateContract);
router.delete("/:id", authGuard,adminGuard, deleteContract);

module.exports = router;
