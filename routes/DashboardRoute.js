const express = require("express");
const router = express.Router();

const {getDashboard} = require("../controllers/DashboardController");

const protect = require("../middleware/authMiddleware");

router.use(protect);

router.get("/show", getDashboard);

module.exports = router;