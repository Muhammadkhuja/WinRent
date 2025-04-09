const {
  addNewPayment,
  findAllPayments,
  findByIdPayment,
  updatePayment,
  deletePayment,
  getClientPayments,
} = require("../controllers/payments.controller");
const adminGuard = require("../middleware/guards/admin.guard");
const authGuard = require("../middleware/guards/auth.guard");
const clientGuard = require("../middleware/guards/client.guard");
const clientSelfGuard = require("../middleware/guards/client.self.guard");

const router = require("express").Router();

router.get("/clientpay", getClientPayments)

router.post("/", authGuard, clientGuard, addNewPayment);
router.get("/", authGuard,adminGuard, findAllPayments);
router.get("/:id", authGuard,clientGuard, clientSelfGuard, findByIdPayment);
router.put("/:id", authGuard,adminGuard, updatePayment);
router.delete("/:id", authGuard,adminGuard, deletePayment);



module.exports = router;
