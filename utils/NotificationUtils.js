const Notification = require("../models/Notification");
const { analysisSub } = require("./SubscripUtils"); 

const checkGoalDeadlines = async (goals) => {
  const notifications = [];
  for (let goal of goals) {
    if (!goal.deadline) continue; 
    const daysLeft = (new Date(goal.deadline) - Date.now()) / (1000 * 60 * 60 * 24);
    if (daysLeft <= 3 && daysLeft > 0) {
      notifications.push({
        user: goal.user,
        message: `⚠️ Goal "${goal.title}" deadline is in ${Math.ceil(daysLeft)} day(s)!`,
        type: "goal"
      });
    }
  }
  if (notifications.length > 0) await Notification.insertMany(notifications);
};

const checkSubscriptionIssues = async (subs) => {
  const analysis = analysisSub(subs); 
  const notifications = [];
  for (let sub of analysis) {
    if (!sub.usageFrequency || sub.usageFrequency === 0) {
      notifications.push({
        user: sub.user,
        message: `❌ You haven't used "${sub.name}" at all. Consider cancelling.`,
        type: "subscription"
      });
    } else if (sub.costperuse > 50) {
      notifications.push({
        user: sub.user,
        message: `💸 "${sub.name}" costs ${sub.costperuse.toFixed(0)} EGP per use — too expensive!`,
        type: "subscription"
      });
    }
    if (sub.healthScore < 40) {
      notifications.push({
        user: sub.user,
        message: `⚠️ "${sub.name}" has a low health score (${sub.healthScore}/100).`,
        type: "subscription"
      });
    }
  }
  if (notifications.length > 0) await Notification.insertMany(notifications);
};

module.exports = { checkGoalDeadlines, checkSubscriptionIssues };