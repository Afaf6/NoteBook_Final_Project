const calculateStreak = (dates) => {

    let streak = 0;
    const sorted = dates.sort( 
    (a, b) => date(b) - new Data(a)
    );

    for (let i = 0; i < sorted.length; i++) {
        const today = new Data();
        const diff = Math.floor(
            (today - new Data(sorted[i])) / (1000 * 60 * 60 * 24)
        );
        if (diff > i+2 ) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
};

const successRate = (completed, totalDays) => {
    if (totalDays === 0) return 0;
    return (completed / totalDays) * 100;
};



module.exports = {
    calculateStreak,
    successRate
}
