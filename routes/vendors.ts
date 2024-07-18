import express from "express";
const router = express.Router();
import {
  addStoreToVendor,
  createVendor,
  deleteVendor,
  getAllVendors,
  getVendor,
} from "../controllers/vendorController";

/* GET get vendor */
router.get("/get-vendor", getVendor);

/* GET get vendor */
router.get("/get-all-vendors", getAllVendors);

/* PATCH add store to vendor */
router.patch("/add-store-to-vendor", addStoreToVendor);

/* POST Create vendor */
router.post("/create-vendor", createVendor);

/* DELETE Delete vendor */
router.delete("/delete-vendor", deleteVendor);

module.exports = router;
