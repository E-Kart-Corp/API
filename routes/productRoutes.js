const express = require("express");
const {
  createProduct,
  checkProduct,
  getProducts,
  getCategory,
  checkAuthenticated,
} = require("../controllers/uploadController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();
router.post("/createProduct", upload.array("image"), createProduct);
router.post("/checkProduct", upload.single("image"), checkProduct);
router.get("/getProduct/:category", getProducts);
router.get("/getCategory", getCategory);

router.post("/authenticated", checkAuthenticated);

module.exports = router;
