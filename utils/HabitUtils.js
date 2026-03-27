const calculateStreak = (habits) => {
    let streak = 0;

    
    const allDates = habits.flatMap(h => h.completedDates || []);

    const sorted = allDates.sort(
        (a, b) => new Date(b) - new Date(a)  
    );

    for (let i = 0; i < sorted.length; i++) {
        const today = new Date();  
        const diff = Math.floor(
            (today - new Date(sorted[i])) / (1000 * 60 * 60 * 24)  // ✅ Date مش Data
        );
        if (diff <= i + 1) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
};

const successRate = (habits) => {
    const totalDays = habits.reduce((acc, h) => acc + (h.completedDates?.length || 0), 0);
    if (totalDays === 0) return 0;
    const completed = totalDays;
    return Math.round((completed / (habits.length * 30)) * 100);
};

module.exports = {
    calculateStreak,
    successRate
};