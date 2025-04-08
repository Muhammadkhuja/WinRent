const {
  addNewCard,
  findAllCards,
  findByIdCard,
  updateCard,
  deleteCard,
} = require("../controllers/card.controller");
const authGuard = require("../middleware/guards/auth.guard");
const clientGuard = require("../middleware/guards/client.guard");
const clientSelfGuard = require("../middleware/guards/client.self.guard");
const Card = require("../models/card.model");

const router = require("express").Router();

router.post("/", authGuard, clientGuard, addNewCard);
router.get("/", authGuard, findAllCards);
router.get("/:id", authGuard,clientGuard,clientSelfGuard(Card), findByIdCard);
router.put("/:id", authGuard, clientGuard, clientSelfGuard(Card), updateCard);
router.delete(
  "/:id",
  authGuard,
  clientGuard,
  clientSelfGuard(Card),
  deleteCard
);

module.exports = router;
