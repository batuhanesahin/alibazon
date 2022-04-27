const express = require('express')
router = express.Router()
submitController = require("../controllers/submitController");

router.post("/submit-form", submitController.submit);

module.exports = router;