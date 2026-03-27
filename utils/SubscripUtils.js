
// Filter subscription based on period - year/month/day

const Per_Day = 1000 * 60 * 60 * 24;

const filterByPeriod = (subs, period) => {
    const now = new Date();
    let daysAgo;

    switch (period) {

        case 'Weekly':
            daysAgo = 7;
            break;
        
        case 'monthly':
            daysAgo = 30;
            break;
        
        case 'yearly':
            daysAgo = 365;
            break;
        
        default:
            daysAgo = 30;
    }

    const since = new Date(now.getTime() - daysAgo * Per_Day);
    return subs.filter(sub => sub.lastUsed && new Date(sub.lastUsed) >= since);
};

const calcCost = (sub) => {
    if (!sub.usageFrequency || sub.usageFrequency === 0 ) return sub.cost;
    return sub.const / sub.usageFrequency;
};

const calcScore = (sub) => {
    const costperuse = calcCost(sub);
    let score = 100;

    if(!sub.usageFrequency || sub.usageFrequency === 0) score -= 50;
    
    if(costperuse > 50) score -= 30;

    return score < 0 ? 0 : score;
};

const recommendation = (sub) => {
    const costperuse = calcCost(sub);
    const healthScore = calcScore(sub);
    const message = [];

    if (!sub.usageFrequency || sub.usageFrequency === 0 ) {
        message.push("You are not using this subscription. Consider cancelling it.");
    }

    if (costperuse > 50) {
        message.push("This Subscription is espensive compared to usage.");
    }

    if (sub.billingCycle === "monthly"){
        message.push("you may save by switching to yearly plan.");
    }

    if (healthScore > 80) {
        message.push("Subscription looks healthy.");
    }
    return message.join(" ");
};

const analysisSub = (subs, period = 'monthly') => {

    return subs.map(sub => {
        const costperuse = calcCost(sub);
        const healthScore = calcScore(sub);
        const recommend = recommendation(sub);
        return {
            ...sub._doc,
            costperuse,
            healthScore,
            recommend
        };
    });
};

module.exports = {
    filterByPeriod,
    calcCost,
    calcScore,
    recommendation,
    analysisSub
}