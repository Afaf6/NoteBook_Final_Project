const { models } = require("mongoose");
const Income = require("../models/Income");

const addIncome = async(req, res) => {
    try {
        const {amount, month} = req.body;

        if(!amount || !month) {
            return res.status(400).json({
                msg: "You Should Enter yout Income and Month"
            });
        }
        const income = await Income.create({
            user: req.auth._id,
            amount,
            month
        });
        res.status(201).json({
            msg: "Income added successfuly",
            data: income
        });
    } catch (error) {
        res.status(500).json({ msg: "Error adding income" });
    }
};

const getTotalIncome = async(req,res) => {
    try {

        const result = await Income.aggregate([
            {$match: {user:req.auth._id}},
            {
                $group: {
                    _id:null,
                    total: {$sum: "$amount"}
                }
            }
        ]);
        const total = result.length > 0 ? result[0].total : 0;

        res.status(200).json({
            totalIncome: total
        });

    } catch (error) {
        res.status(500).json({
            msg: "Error calculating total income"
        })
    }
}

module.exports = {
    addIncome,
    getTotalIncome
}