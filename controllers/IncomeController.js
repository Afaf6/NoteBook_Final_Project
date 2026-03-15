
const Income = require("../models/Income");
const incomeVaildSchema = require("./validation/incomeValid");

const addIncome = async(req, res) => {
    try {
        
          const {error} = incomeVaildSchema.validate(req.body, {abortEarly: false});

         if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            });
        };


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

const updateIncome = async (req, res) => {
    try {
        const { id } = req.params;

        const income = await Income.findOne({
            _id: id,
            user: req.auth._id,
        });

        if (!income){
            return res.status(404).json({
                msg: "Income not found"});
        }

        Object.assign(income, req.body);

        await income.save();

        res.status(200).json({
            msg: "Income updates",
            income,
        });

    } catch (error) {
        res.status(500).json({
            msg: error.msg
        })
    }
};

const deleteIncome = async (req, res) => {
    try {
        const {id} = req.params;

        const income = await Income.findByIdAndDelete({
            _id: id,
            user: req.auth._id,
        });

        if (!income) {
            return res.status(404).json({
                msg: "income not found"
            });
        }

        res.status(200).json({
            msg: "income Delete"
        });

    } catch (error) {
        res.status(500).json({
            msg: error.msg
        });
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
    updateIncome,
    deleteIncome,
    getTotalIncome
}