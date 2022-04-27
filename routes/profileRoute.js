const express = require("express");
router = express.Router();
profileController = require("../controllers/profileController"); 

router.get("/auth/profile", profileController.profileGet);

module.exports = router;