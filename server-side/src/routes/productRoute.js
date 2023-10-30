const express = require("express");
const router = express.Router();

const {
	productList,
	createProduct,
	productById,
	productUpdate,
	productDelete,
} = require("../controllers/productController");

router.get("/product-list/:pageNo/:perPage/:searchKeyword", productList);
router.post("/create-product", createProduct);
router.get("product-by-id/:productId", productById);
router.put("product-update/:productId", productUpdate);
router.delete("product-delete/:productId", productDelete);

module.exports = router;
