const express = require("express");
const {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
} = require("../Controllers/ItemController");
const router = express.Router();

//Routes
router.get("/get-item", getItemController);

router.post("/add-item", addItemController);

router.put("/edit-item", editItemController);

router.post("/delete-item", deleteItemController);

module.exports = router;
