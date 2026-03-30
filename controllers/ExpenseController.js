const Expense = require("../models/Expense");
const ExpenseValidSchema = require("./validation/expenseValid")

const addExpense = async (req, res) => {
    try {
         const {error} = ExpenseValidSchema.validate(req.body, {abortEarly: false});

         if (error) {
            return res.status(400).json({ msg: error.details.map(d => d.message).join(", ") });
         }

         const expense = await Expense.create({
            user: req.auth._id,
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date || new Date(),
        });

        res.status(201).json({ msg: "Expense added successfully", expense });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findOneAndDelete({
            _id: id,
            user: req.auth._id
        });

        if (!expense) return res.status(404).json({ msg: "Expense not found" });

        res.status(200).json({ msg: "Expense deleted", expense });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


 const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.auth._id })
      .sort({ date: -1 }); 

    const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

    res.status(200).json({
      totalExpenses,
      details: expenses,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



module.exports = { addExpense, deleteExpense, getAllExpenses};