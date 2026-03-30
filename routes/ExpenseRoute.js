
const express = require("express");
const router = express.Router();
const { addExpense, deleteExpense, getAllExpenses, getMonthlyExpenses } = require("../controllers/ExpenseController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.post("/add", addExpense);
router.delete("/delete/:id", deleteExpense);
router.get("/getall", getAllExpenses);


module.exports = router;