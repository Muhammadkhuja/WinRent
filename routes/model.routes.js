const { addNewModel, findAllModels, findByIdModel, updateModel, deleteModel } = require("../controllers/model.controller");

const router = require("express").Router();

router.post("/", addNewModel);
router.get("/", findAllModels);
router.get("/:id", findByIdModel);
router.put("/:id", updateModel);
router.delete("/:id", deleteModel);

module.exports = router;
