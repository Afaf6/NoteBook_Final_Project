const Notification = require("../models/Notification");
const { analysisSub } = require("./SubscripUtils"); 

const checkGoalDeadlines = async (goals) => {
  for (let goal of goals) {
    if (!goal.deadline) continue;
    
    const daysLeft = (new Date(goal.deadline) - Date.now()) / (1000 * 60 * 60 * 24);
    
    if (daysLeft <= 4 && daysLeft > -2) {
      
      const exists = await Notification.findOne({
        user: goal.user,
        type: "goal",
        message: { $regex: goal.title }
      });
      
      if (!exists) {
        await Notification.create({
          user: goal.user,
          message: `⚠️ Goal "${goal.title}" deadline is in ${Math.ceil(daysLeft)} day(s)!`,
          type: "goal"
        });
      }
    }
  }
};


const checkSubscriptionIssues = async (subs) => {
  const analysis = analysisSub(subs);
  const notifications = [];
  
  for (let sub of analysis) {
    
    const exists = await Notification.findOne({
      user: sub.user,
      type: "subscription",
      message: { $regex: sub.name }
    });
    
    if (exists) continue;

    if (!sub.usageFrequency || sub.usageFrequency === 0) {
      await Notification.create({
        user: sub.user,
        message: `❌ You haven't used "${sub.name}" at all. Consider cancelling.`,
        type: "subscription"
      });
    } else if (sub.costperuse > 50) {
      await Notification.create({
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