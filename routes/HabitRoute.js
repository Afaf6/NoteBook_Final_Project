const express = require ("express");
const router = express.Router();

const {
    createHabits,
    getHabit,
    markComplete,
    deleteHabit,
} = require("../controllers/HabitsController");

const protect = require("../middleware/authMiddleware");
router.use(protect);

router.post("/create",createHabits);
router.get("/get",getHabit);
router.post("/complete/:id",markComplete);
router.delete("/delete/:id",deleteHabit);


module.exports = router;