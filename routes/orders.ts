import express from "express";
const router = express.Router();
import {
	updateOrderStatus,
	createOrder,
	createOrder2,
	getActiveOrders,
	getOrderDetails,
	getOrders,
	getOrdersByDriverId,
	getOrdersByUserId,
	getUserOrders
} from "../controllers/ordersController";

/* GET Get Active Orders */
router.get("/get-active-orders", getActiveOrders);
/* GET Get Order Details */
router.get("/get-order-details", getOrderDetails);
/* GET Get Orders */
router.get("/get-orders", getOrders);
/* GET Get User Orders */
router.get("/get-user-orders", getUserOrders);
/* POST Create Order */
router.post("/create-order", createOrder);

/* Prisma Endpoints */
/* PUT Acceprt Order */
router.put("/accept-order", updateOrderStatus);

/* POST Create Order2 */
router.post("/create-order2", createOrder2);
/* GET Get Orders By User Id */
router.get("/get-order-by-driver-id", getOrdersByDriverId);
/* GET Get Orders By User Id */
router.get("/get-order-by-user-id", getOrdersByUserId);
/* GET Get Orders By User Id */
// router.get("/get-order-by-user-id", getOrdersByUserId);

/* GET Gee Active Orders3 */
router.get("/get-active-orders", getActiveOrders);
module.exports = router;
