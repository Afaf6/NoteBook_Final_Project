const {models} = require("mongoose");
const Goals = require("../models/Goals");

const createGoals = async (req, res) => {
    try {
        const {title, targetValue, currentValue, deadline} = req.body;

        if (!title || !targetValue || !currentValue) {
            return res.status(400).json({
                msg: "You Need To Add Your Goal"
            });
        }
        const goal = await Goals.create({
            title,
            currentValue,
            targetValue,
            deadline,
            user: req.auth._id,
        });

        res.status(201).json({
            msg: "You Create Your Goal"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error"
        })
    }
}

const updategoals = async (req, res) => {
    try {
        const { id } = req.params;

        const goal = await Goals.findOne({
            _id: id,
            user: req.auth._id,
        });

        if (!goal){
            return res.status(404).json({msg: "Goal not found"});
        }

        Object.assign(goal, req.body);

        await goal.save();

        res.status(200).json({
            msg: "Goal updates",
            goal,
        });

    } catch (error) {
        res.status(500).json({
            msg: error.msg
        })
    }
};

const deleteGoals = async (req, res) => {
    try {
        const {id} = req.params;

        const goal = await Goals.findByIdAndDelete({
            _id: id,
            user: req.auth._id,
        });

        if (!goal) {
            return res.status(404).json({
                msg: "Goal not found"
            });
        }

        res.status(200).json({
            msg: "Goal Delete"
        });

    } catch (error) {
        res.status(500).json({
            msg: error.msg
        });
    }
};

const getAllGoals = async (req, res) => {
    try {
        const allgoals = await Goals.find({ user: req.auth._id});

        res.status(200).json({
            msg: "All Goals",
            allgoals,
        });

    } catch (error) {
        res.status(500).json({msg: "Can't delete the goal"})
    }
};

const getGoalsProgress = async (req,res) => {
    try {
        const goals = await Goals.find({ user: req.auth._id});

        const goalsProgress = goals.map((goal) => {
            const progress = 
            ( goal.currentValue / goal.targetValue) * 100;
            
            return {
                ...goal._doc,
                progress: progress.toFixed(2),
            };
        });

        res.status(200).json(goalsProgress);

    } catch (error) {
        res.status(500).json({msg: error.msg});
    }
};


module.exports = {
    createGoals,
    updategoals,
    deleteGoals,
    getAllGoals,
    getGoalsProgress
};