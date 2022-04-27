const express = require("express");
router = express.Router();
ctrlMain = require("../controllers/mainPageController");

router.get("/", ctrlMain.index);

module.exports = router;
