const Expense = require("../models/Expense");
const ExpenseValidSchema = require("./validation/expenseValid")

const addExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;

        const expense = await Expense.create({
            user: req.auth._id,
            title,
            amount,
            category,
            date
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


const getMonthlyExpenses = async (req, res) => {
    try {
        const month = parseInt(req.query.month) || new Date().getMonth() + 1; // 1-12
        const year = parseInt(req.query.year) || new Date().getFullYear();

        const expenses = await Expense.aggregate([
            { $match: { user: req.auth._id } },
            {
                $project: {
                    title: 1,
                    amount: 1,
                    category: 1,
                    month: { $month: "$date" },
                    year: { $year: "$date" },
                },
            },
            { $match: { month, year } },
            {
                $group: {
                    _id: null,
                    totalExpenses: { $sum: "$amount" },
                    details: { $push: "$$ROOT" },
                },
            },
        ]);

        const result = expenses[0] || { totalExpenses: 0, details: [] };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { addExpense, deleteExpense, getMonthlyExpenses };