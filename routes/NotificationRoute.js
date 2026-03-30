const express = require("express");
const router = express.Router();
const { checkGoalDeadlines, checkSubscriptionIssues, getNotifications, deleteNotification, markAsRead } = require("../controllers/NotificationController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.get("/goals", checkGoalDeadlines);    
router.get("/subs", checkSubscriptionIssues); 
router.get("/note", getNotifications);
router.delete("/delete/:id", deleteNotification);           
router.patch("/read/:id", markAsRead);

module.exports = router;