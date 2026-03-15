
const express = require("express");
const router = express.Router();

const {addIncome, updateIncome, deleteIncome, getTotalIncome} = require("../controllers/IncomeController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.post("/add", addIncome);
router.put("/update/:id", updateIncome);
router.delete("/delete/:id", deleteIncome);
router.get("/total", getTotalIncome);

module.exports = router;