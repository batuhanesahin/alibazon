const express = require("express");
 router = express.Router();
 womenCategoryController = require("../controllers/womenCategoryController");

router.get("/women" , womenCategoryController.women);

module.exports = router;