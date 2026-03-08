
const express = require("express");
const router = express.Router();

const {addIncome, getTotalIncome} = require("../controllers/IncomeController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.post("/add", addIncome);
router.get("/total", getTotalIncome);

module.exports = router;