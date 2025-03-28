const express = require("express");
const { getEarthquakes, getEarthquakeById } = require("../controller/earthquakeController");
const rateLimiter = require("../middleware/rateLimit");

const router = express.Router();

// Apply rate limiter to all earthquake routes
router.use(rateLimiter);

router.get("/", getEarthquakes);
router.get("/:id", getEarthquakeById);

module.exports = router;
