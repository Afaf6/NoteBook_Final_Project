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
      const subsTotal = subs.reduce((acc, sub) => acc + sub.cost, 0);
      const subsAnalysis = analysisSub(subs);

      const finalExpense = totalExpense + subsTotal;

      // Bad Subs
      const badSubs = subsAnalysis.filter(sub => sub.healthScore < 50);

      // Calc Saves
      const savings = badSubs.reduce((acc, sub) => acc + sub.cost, 0);

      const subsRatio = totalIncome > 0 ? (subsTotal / totalIncome) * 100 : 0;

      let insightMessage = "";
      if (subsRatio > 50) {
        insightMessage = `⚠️ Subscriptions take ${Math.round(subsRatio)}% of your income! Consider cancelling some.`;
      } else if (subsRatio > 30) {
        insightMessage = "⚠️ You are spending a high portion of your income on subscriptions.";
      } else if (subsRatio > 10) {
        insightMessage = "👍 Your subscription spending is reasonable.";
      } else {
        insightMessage = "✅ You have very low subscription expenses.";
      } 

      res.json({
        totalIncome,
        totalExpense: finalExpense, 
        balance: totalIncome - finalExpense,
        badSubscrip: badSubs.length,
        possibleSaving: savings,
        subscrip: subsAnalysis,
        subsRatio: Math.round(subsRatio),
        insightMessage
      });

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = {getDashboard};