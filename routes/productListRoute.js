const express = require("express"),
  router = express.Router(),
  productListController = require("../controllers/productListController");

router.get("/:parent_category_id", productListController.product);

module.exports = router;