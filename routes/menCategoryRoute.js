const express = require("express");
 router = express.Router();
 menCategoryController = require("../controllers/menCategoryController");

router.get("/men" , menCategoryController.men);

module.exports = router;