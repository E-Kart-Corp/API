const express = require("express");
const {
  createProduct,
  checkProduct,
  getProducts,
  getCategory
} = require("../controllers/uploadController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();
router.post("/create_product", upload.array('image'), createProduct);
router.post("/check_product", upload.single("image"), checkProduct);
router.get("/getproduct", getProducts);
router.get("/getCategory", getCategory);


module.exports = router;
