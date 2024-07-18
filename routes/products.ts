import {
	getCategories,
	getProduct,
	getProducts,
	getProductsByStore,
	createExampleProducts,
	createCategories,
	createProduct,
	updateProduct,
	deleteProduct
} from "../controllers/productsController";

const upload = require("../utils/multerConfig");

import express from "express";
const router = express.Router();

import {
	getAllProducts,
	getCategories2
} from "../controllers/productsController";
/* GET product listing. */

router.get("/get-product/:id", getProduct);

router.get("/get-products", getCategories, getProducts);

/* GET Get All Products. */
router.get("/get-all-products", getAllProducts);

/* GET Get Categories. */
router.get("/get-categories", getCategories2);

/* GET Get products by store */
router.get("/get-products-by-store", getProductsByStore);

/* POST Create Example Products. */
router.post("/create-example-products", createExampleProducts);

/*POST Create Categories */
router.post("/create-category", createCategories);

router.post("/create-product", upload.single("image"), createProduct);

router.put("/update-product/:id", upload.single("image"), updateProduct);

router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
