const express = require("express");
const router = express.Router();

const {
    addSubscrip,
    updateSubscrip,
    deleteSubscrip,
    getAllSubscrip,
    getSubAnalytics
} = require("../controllers/SubscripController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.post("/add", addSubscrip);
router.put("/update/:id",updateSubscrip );
router.delete("/delete/:id",deleteSubscrip );
router.get("/getall", getAllSubscrip);
router.get("/analysis", getSubAnalytics);


module.exports = router;