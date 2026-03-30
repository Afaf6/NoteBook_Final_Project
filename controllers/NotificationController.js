const Notification = require("../models/Notification");
const Goal = require("../models/Goals");
const Subscription = require("../models/Subscription");

const { 
  checkGoalDeadlines: runGoalCheck, 
  checkSubscriptionIssues: runSubCheck 
} = require("../utils/NotificationUtils");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.auth._id })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json({ count: notifications.length, data: notifications });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const checkGoalDeadlines = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.auth._id });
    await runGoalCheck(goals); 
    
    res.json({ 
      msg: "Goal notifications checked",
      goals
     });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const checkSubscriptionIssues = async (req, res) => {
  try {
    const subs = await Subscription.find({ user: req.auth._id });
    await runSubCheck(subs); 
    res.json({ msg: "Subscription notifications checked" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteNotification = async (req, res) => {
    try {
        await Notification.findOneAndDelete({
            _id: req.params.id,
            user: req.auth._id
        });
        res.json({ msg: "Notification deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const markAsRead = async (req, res) => {
    try {
        if (req.params.id) {
            // one as mark 
            await Notification.findOneAndUpdate(
                { _id: req.params.id, user: req.auth._id },
                { isRead: true }
            );
        } else {
            // all as mark
            await Notification.updateMany({ user: req.auth._id }, { isRead: true });
        }
        res.json({ msg: "Marked as read" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { getNotifications, checkGoalDeadlines, checkSubscriptionIssues, deleteNotification, markAsRead };