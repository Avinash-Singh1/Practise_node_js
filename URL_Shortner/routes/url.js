const express = require('express');
const { handleGenerateNewURL,handleGetanalytics } = require("../controllers/urlControllers");

const router = express.Router();

// Define POST route

router.post("/", handleGenerateNewURL);
router.get("/analytics/:shortid", handleGetanalytics);
// Export the router
module.exports = router;
