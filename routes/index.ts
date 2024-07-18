var express = require("express");
var router = express.Router();
const addressRouter = require("./address");
const driverRouter = require("./drivers");
const ordersRouter = require("./orders");
const productsRouter = require("./products");
const storesRouter = require("./stores");
const usersRouter = require("./users");
const vendorsRouter = require("./vendors");

/* GET home page. */

router.use("/address", addressRouter);
router.use("/billingaddress", usersRouter);
router.use("/drivers", driverRouter)
router.use("/orders", ordersRouter);
router.use("/products", productsRouter);
router.use("/stores", storesRouter);
router.use("/users", usersRouter);
router.use("/vendors", vendorsRouter);
module.exports = router;
