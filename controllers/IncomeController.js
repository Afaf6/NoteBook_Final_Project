const { models } = require("mongoose");
const Income = require("../models/Income");
const incomeVaildSchema = require("./validation/incomeValid");

const addIncome = async(req, res) => {
    try {
        
          const {error} = incomeVaildSchema.validate(req.body, {abortEarly: false});
         if (error) {
            return res.status(400).json({
                msg: error.details.map(d => d.message)
            });
        };
        // if(!amount || !month) {
        //     return res.status(400).json({
        //         msg: "You Should Enter yout Income and Month"
        //     });
        // }
        
        //const {amount, month} = req.body;

        const income = await Income.create({
            ...req.body,
            user: req.auth._id
            
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