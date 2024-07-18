import express from "express";
const router = express.Router();

import {
    createBillingAddress,
    createShippingAddress,
    deleteBillingAddress,
    deleteShippingAddress,
    getBillingAddress,
    getShippingAddress
} from "../controllers/addressController";

/* DELETE Delete billing address */
router.delete("/delete-billing-address", deleteBillingAddress);

/* DELETE Delete shipping address */
router.delete("/delete-shipping-address", deleteShippingAddress);

/* GET Get billing address */
router.get("/get-billing-address", getBillingAddress);

/* GET Get shipping address */
router.get("/get-shipping-address", getShippingAddress);

/* POST Create new billing address */
router.post("/create-billing-address", createBillingAddress);

/* POST Create new shipping address */
router.post("/create-shipping-address", createShippingAddress);

module.exports = router;
