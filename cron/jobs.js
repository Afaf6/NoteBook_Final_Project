const cron = require("node-cron");
const Goals = require("../models/Goals");
const Subscription = require("../models/Subscription");
const { checkGoalDeadlines, checkSubscriptionIssues } = require("../utils/NotificationUtils"); // ← الاسم الصح


cron.schedule("0 9 * * *", async () => {
  console.log("Running daily notifications check...");
  try {
    const goals = await Goal.find();
    await checkGoalDeadlines(goals);

    const subs = await Subscription.find();
    await checkSubscriptionIssues(subs);

    console.log("Notifications check done!");
  } catch (err) {
    console.error("Cron error:", err.message);
  }
});