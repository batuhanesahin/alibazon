const express = require("express");
router = express.Router();
signUpController = require("../controllers/signUpController");
var mid = require("../middlewares/login")

router.post("/auth/signup", signUpController.signup);
router.get("/auth/signup", mid.login ,signUpController.signupGet);

module.exports = router;
