import express from "express";
const router = express.Router();
import {
	createStore,
	deleteStore,
	getAllStores,
	getVendorStores,
	getStore,
	updateStore
} from "../controllers/storesController";

/* GET Get all stores */
router.get("/get-all-stores", getAllStores);

/* GET Get store by id */
router.get("/get-store/:id", getStore);

/* GET Get store by id */
router.get("/get-vendor-stores", getVendorStores);

/* DEL Delete store */
router.delete("/delete-store/:id", deleteStore);

/* DEL Delete store */
router.put("/update-store/:id", updateStore);

/* POST Create store */
router.post("/create-store", createStore);

module.exports = router;
