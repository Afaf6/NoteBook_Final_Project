const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {registerAuth, loginAuth} = require("../controllers/AuthController");

router.get("/profile", protect, (req, res) => {
    res.json(req.auth);
});

router.post("/register", registerAuth);
router.post("/login", loginAuth);

module.exports = router;