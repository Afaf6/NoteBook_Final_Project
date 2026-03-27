const express = require("express");
const router = express.Router();
const { getNotifications, checkGoalDeadlines, checkSubscriptionIssues } = require("../controllers/NotificationController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.get("/note", getNotifications);           
router.get("/goals", checkGoalDeadlines);    
router.get("/subs", checkSubscriptionIssues); 

module.exports = router;