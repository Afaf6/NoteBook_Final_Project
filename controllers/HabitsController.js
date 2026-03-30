
const Habit = require ("../models/Habits");
const habitValidSchema = require("./validation/habitValid");

const {
    calculateStreak,
    successRate
} = require ("../utils/HabitUtils");

const createHabits = async(req, res) => {
    try {
        const {error} = habitValidSchema.validate(req.body, {abortEarly: false});

        if (error){
            return res.status(400).json({
                msg: error.details.map(d => d.message)
            });
        };

        const habit = await Habit.create({
            ...req.body,
            user: req.auth._id,
        });

        res.status(201).json({
            msg: "Your Habit creadet successfuly",
            habit
        });
    } catch (error) {
         res.status(500).json({
            msg: "Error Creating Goal"
        });
    }
};

const getHabit = async(req, res) => {
    try {
         console.log("User:", req.auth);
        const habits = await Habit.find({
            user: req.auth._id
        });
        
        const streak = calculateStreak(habits);
        const precent = successRate(habits);

        res.status(200).json({
            msg: "Your HAbit",
            habits,
            streak,
            precent
            
        });


    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
};

const markComplete = async (req, res) => {
    try {
        const habit = await Habit.findOne({
            _id: req.params.id,
            user: req.auth._id
        });

        if (!habit) {
            return res.status(404).json({
                msg: "Habit not found"
            });
        }

        habit.completedDates.push(new Date());
        await habit.save();

        res.json({
            msg: "Habit Marked completed",
            habit
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });

    }
};

const deleteHabit = async (req, res) => {
    try {
        const {id} = req.params;

        const habit = await Habit.findByIdAndDelete({
            _id: id ,
            user: req.auth._id,
        });

        if (!habit) {
            return res.status(404).json({
                msg: "Habit not found"
            });
        }

        res.status(200).json({
            msg: "Delete Habit"
        })
    } catch (error) {
        res.status(500).json({
            msg: error.msg
        })
    }
}

module.exports = {
    createHabits,
    getHabit,
    markComplete,
    deleteHabit,
}