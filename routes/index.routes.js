const router = require("express").Router()

const adminROUTE = require("./admin.routes")
const ownerROUTE = require("./owner.routes")
const modelROUTE = require("./model.routes")
const productsROUTE = require("./products.routes")
const contractROUTE = require("./contracts.routes")
const statusROUTE = require("./status.routes")
const paymentsROUTE = require("./payments.routes")
const RentalPeriodROUTER = require("./rentalperiods.routes")
const cardROUTE = require("./card.routes")
const categoryROUTE = require("./category.routes")
const userROUTE = require("./user.routes")

router.use("/admin", adminROUTE)
router.use("/owner", ownerROUTE)
router.use("/model", modelROUTE)
router.use("/products", productsROUTE)
router.use("/contracts",  contractROUTE);
router.use("/status", statusROUTE)
router.use("/payments", paymentsROUTE)
router.use("/rentalp", RentalPeriodROUTER);
router.use("/card", cardROUTE)
router.use("/category", categoryROUTE)
router.use("/user", userROUTE)

module.exports = router