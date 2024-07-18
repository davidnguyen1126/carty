import express from "express";
const router = express.Router();
import {
    createDriver,
    deleteDriver,
    getAllDrivers,
    getDriver
} from "../controllers/driversController";

/* GET get driver */
router.get("/get-driver", getDriver);

/* GET get all drivers */
router.get("/get-all-drivers", getAllDrivers);

/* POST Create new driver. */
router.post("/create-driver", createDriver);

/* DELETE Delete driver */
router.delete("/delete-driver", deleteDriver);

module.exports = router;