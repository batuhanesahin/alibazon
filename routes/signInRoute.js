const express = require("express");
router = express.Router();
signInController = require("../controllers/signInController");
var mid = require("../middlewares/login")

router.post("/auth/signin", signInController.signin);
router.get("/auth/signin", mid.login ,signInController.signinGet);


module.exports = router;
