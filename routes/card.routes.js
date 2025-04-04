const { addNewCard, findAllCards, findByIdCard, updateCard, deleteCard } = require("../controllers/card.controller");

const router = require("express").Router();

router.post("/", addNewCard);
router.get("/", findAllCards);
router.get("/:id", findByIdCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

module.exports = router;
