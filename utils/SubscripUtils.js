
// Filter subscription based on period - year/month/day

const Per_Day = 1000 * 60 * 60 * 24;

const filterByPeriod = (subs, period) => {
    const now = new Date();
    let daysAgo;

    switch (period) {
        
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
    if (!sub.usageFrequency || sub.usageFrequency === 0) {
        return sub.cost;
    }
    return sub.cost / sub.usageFrequency;
};

const calcScore = (sub) => {
    const costPerUse = calcCost(sub);
    let score = 100;

    if (!sub.usageFrequency || sub.usageFrequency === 0) {
        score -= 50;
    }

    if (costPerUse > 50) {
        score -= 30;
    }

    return score < 0 ? 0 : score;
};



const recommendation = (sub) => {
    const costPerUse = calcCost(sub);
    const usage = sub.usageFrequency || 0;
    const healthScore = calcScore(sub);

    const message = [];

    // unusage
    if (usage === 0) {
        message.push("You are not using this subscription at all. Cancel it immediately.");
    }

    // Bad usage
    else if (usage < 5) {
        message.push("Your usage is very low. It’s better to cancel this subscription and save money.");
    }

    // moderate
    else if (usage >= 5 && usage < 15) {
        message.push("Your usage is moderate. Consider if you really need this subscription.");
    }

    // Balenced usage per month
    else if (usage >= 15 && usage <= 25) {
        message.push("Your usage is balanced. Monthly subscription is suitable.");
    }

    // High usage
    else if (usage > 25) {
        message.push("You are using this frequently. Yearly plan is better.");
    }

    // Expensiv to use
    if (costPerUse > 50) {
        message.push("This subscription is expensive compared to your usage.");
    }

    //Better to use yearly
    if (usage > 25 && sub.billingCycle === "monthly") {
    message.push("Switching to yearly plan could save around 20%.");
}

    //Healthy
    if (healthScore >= 80) {
        message.push("Subscription looks healthy.");
    }

    return message.join(" ");
};

const analysisSub = (subs) => {
    return subs.map(sub => {
        const costPerUse = calcCost(sub);
        const healthScore = calcScore(sub);
        const recommend = recommendation(sub);

        return {
            ...sub._doc,
            costPerUse,   
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