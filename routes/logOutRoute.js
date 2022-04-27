const express = require("express");
router = express.Router();
logOutController = require("../controllers/logOutController");

router.get("/logout", logOutController.logOut);


module.exports = router;
