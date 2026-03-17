const {models} = require("mongoose");
const Subscription = require("../models/Subscription");
const SubscripValidSchema = require("./validation/SubscripValid");

const addSubscrip = async (req, res) => {
    try {
        const {error} = SubscripValidSchema.validate(req.body, {abortEarly: false});

        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            });
        };

        const subscrip = await Subscription.create({
            ...req.body,
            user: req.auth._id
        });
        res.status(201).json({
            msg: "Add Subscrip",
            data: subscrip
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error adding Subscrip"
        })
    }
}

const updateSubscrip = async (req, res) => {
    try {
        const { id } = req.params;

        const subscrip = await Subscription.findById({
            _id: id,
            user: req.auth._id
        });

        if (!subscrip) {
            return res.status(400).json({
                msg: "Subscription not found"
            });
        };
        Object.assign(income, req.body);

        await subscrip.save();

        res.status(201).json({
            msg: "update successfuly",
            subscrip,
        })

        
    } catch (error) {
        res.status(500).json({
            msg: error.msg
        })
    }
}

const deleteSubscrip = async (req, res) => {
    try {
        const {id} = req.params;

        const subscrip = await Subscription.findByIdAndDelete({
            _id: id,
            user: req.auth._id
        });

        if (!subscrip) {
            return res.status(400).json({
                msg: "Subscription not found"
            });
        };

        res.status(201).json({
            msg: "update successfuly",
            subscrip,
        })

    } catch (error) {
        res.status(500).json({
            msg: error.msg
        })
    }
}

const getAllSubscrip = async (req, res) => {
    try {
        const totalsub = await Subscription.find({
            user: req.auth._id
        });

        res.status(201).json({
            msg: "update successfuly",
            totalsub,
        });

    } catch (error) {
        res.status(500).json({
            msg: error.msg
        })
    }
}

module.exports = {
    addSubscrip,
    updateSubscrip,
    deleteSubscrip,
    getAllSubscrip
}