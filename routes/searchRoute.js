const express = require('express')
router = express.Router()
searchController = require("../controllers/searchController");

router.post("/submit-form", searchController.search);

module.exports = router;