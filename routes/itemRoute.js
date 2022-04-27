const express = require("express"),
  router = express.Router(),
  itemController = require("../controllers/itemController");

router.get("/item/:id", itemController.item);

module.exports = router;
