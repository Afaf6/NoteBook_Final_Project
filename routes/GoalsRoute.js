const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
    createGoals,
        updategoals,
        deleteGoals,
        getAllGoals,
        getGoalsProgress,
} = require("../controllers/GoalsController");

router.use(protect);

router.post("/create",createGoals);
router.put("/update/:id",updategoals);
router.delete("/delete/:id",deleteGoals);
router.get("/all",getAllGoals);
router.get("/progress",getGoalsProgress);

module.exports = router;
