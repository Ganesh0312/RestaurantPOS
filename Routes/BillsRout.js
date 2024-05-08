const express = require("express");
const {
  billsController,
  getbillsController,
} = require("../Controllers/BillsController");
const router = express.Router();

router.post("/bills", billsController);

router.get("/get-bills", getbillsController);

module.exports = router;
