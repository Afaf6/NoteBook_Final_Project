const Income = require("../models/Income");
const Expense = require("../models/Expense");
const Subscription = require("../models/Subscription");
const { analysisSub } = require("../utils/SubscripUtils");

const getDashboard = async (req, res) =>{
    try {
      // Totale Income
      const incomeResult = await Income.aggregate([
        { $match: { user: req.auth._id } },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);
      const totalIncome = incomeResult.length > 0 ? incomeResult[0].total : 0;

      // Tatal Expense 
      const expenseResult = await Expense.aggregate([
        { $match: { user: req.auth._id } },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);
      const totalExpense = expenseResult.length > 0 ? expenseResult[0].total : 0;

      // Subscrips
      const subs = await Subscription.find({
        user: req.auth._id
      });
      const subsAnalysis = analysisSub(subs);

      // Bad Subs
      const badSubs = subsAnalysis.filter(sub => sub.calcScore < 50);

      // Calc Saves
      const savings = badSubs.reduce((acc, sub) => acc + sub.cost, 0);

      res.json({
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        badSubscrip: badSubs.length,
        possibleSaving: savings,
        subscrip: subsAnalysis
      });

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = {getDashboard};