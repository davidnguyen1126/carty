import { pool } from "../db/pg";
import { Request, Response } from "express";
import { prisma } from "../client";
import { OrderServices } from "../services/OrderServices";

const updateOrderStatus = async (req: Request, res: Response) => {
	try {
		res.send(await OrderServices.updateOrderStatus(req.body));
	} catch (err) {
		res.status(400).send({ err });
	}
};

const createOrder = async (req: Request, res: Response) => {
	const client = await pool.connect();

	const insertOrder = async (order: any) => {
		const { user, orderBillingAddressId, orderShippingAddressId, storeId } =
			order;
		const sql = `
            INSERT INTO
                orders (userId, driver_id, orderStatus, delivery_address_id, billing_address_id, pickup_address_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id`;

		const values = [
			user.id,
			null,
			1,
			orderShippingAddressId,
			orderBillingAddressId,
			storeId
		];
		const result = await client.query(sql, values);

		return result.rows[0].id;
	};

	const insertOrderItems = async (id: number, orderItems: any) => {
		for (const item of orderItems) {
			const sql = `
					INSERT INTO orderItems (qty, product_id, order_id)
					VALUES ($1, $2, $3)
			`;
			const values = [item.quantityInCart, item.id, id];
			await client.query(sql, values);
		}
	};

	const subtractQuantityFromStore = (orderItems: any) => {
		for (const item of orderItems) {
			const sql = `
			UPDATE 
				products
			SET 
				qty = qty - $1
			WHERE 
				id = $2
			AND 
				store_id = $3`;
			const values = [item.quantityInCart, item.id, item.storeId];
		}
	};

	try {
		const orderId = await insertOrder(req.body.order);
		insertOrderItems(orderId, req.body.order.cart);
		subtractQuantityFromStore(req.body.order.cart);
		return res.send({
			data: req.body.order,
			msg: "Order Successfully Created"
		});
	} catch (err) {
		return res
			.status(500)
			.send({ msg: `There was an issue submitting the order: ${err}` });
	}
};

const getOrderDetails = async (req: Request, res: Response) => {
	const client = await pool.connect();

	const { orderId } = req.query;
	const sql = `
			SELECT 
				o.id as orderId,
				o.createdAt as createdAt,
				o.delivered_at as deliveredAt,
				countryCode,
				p.title,
				c.title as category,
				oi.qty,
				p.price,
				streetAddress as deliverStreetAddress,
				city as deliverCity,
				state as deliverState,
				postalCode as deliverZip,
				country as deliverCountry,
				aptNmbr as deliverAptNmbr,
				lat as deliverLat,
				long as deliverLong,
				s.name as storeName,
				s.streetAddress as storeAddress,
				s.city as storeCity,
				s.state as storeState,
				s.zip as storeZip,
				s.lat as storeLat,
				s.long as storeLong
			FROM orders o
			JOIN orderItems oi
			ON o.id = oi.order_id
			JOIN users u
			ON o.userId = u.id
			JOIN shippingAddresses sa
			ON id = o.delivery_address_id
			JOIN products p
			ON p.id = oi.product_id
			JOIN categories c 
			ON c.id = p.category_id
			JOIN stores s
			ON s.id = o.pickup_address_id
			WHERE 
				o.id = $1`;
	const result = await client.query(sql, [orderId]);
	return res.send({ data: result.rows });
};

const getUserOrders = async (req: Request, res: Response) => {
	const client = await pool.connect();
	const { userId } = req.query;

	const sql = `
			SELECT 
				o.id as orderId,
				o.createdAt as createdAt,
				o.delivered_at as deliveredAt,
				countryCode,
				p.title,
				c.title as category,
				oi.qty,
				p.price,
				streetAddress as deliverStreetAddress,
				city as deliverCity,
				state as deliverState,
				postalCode as deliverZip,
				country as deliverCountry,
				aptNmbr as deliverAptNmbr,
				lat as deliverLat,
				long as deliverLong,
				s.name as storeName,
				s.streetAddress as storeAddress,
				s.city as storeCity,
				s.state as storeState,
				s.zip as storeZip,
				s.lat as storeLat,
				s.long as storeLong
			FROM orders o
			JOIN orderItems oi
			ON o.id = oi.order_id
			JOIN users u
			ON o.userId = u.id
			JOIN shippingAddresses sa
			ON id = o.delivery_address_id
			JOIN products p
			ON p.id = oi.product_id
			JOIN categories c 
			ON c.id = p.category_id
			JOIN stores s
			ON s.id = o.pickup_address_id
			WHERE 
				o.userId = $1`;

	const result = await client.query(sql, [userId]);
	return res.send({ data: result.rows });
};

// Prisma Endpoints

const createOrder2 = async (req: Request, res: Response) => {
	try {
		res.send(await OrderServices.createOrder(req.body, req.body.cart));
	} catch (err) {
		res.send({ "Create Order Error: ": err });
	}
};

const getOrders = async (req: Request, res: Response) => {
	try {
		res.send(await OrderServices.getOrders());
	} catch (err) {
		res.send({ "Get Order Error: ": err });
	}
};

const getOrdersByUserId = async (req: Request, res: Response) => {
	try {
		res.send(
			await OrderServices.getOrdersByUserId(req.query.id!.toString())
		);
	} catch (err) {
		res.send({ "Get Order By Id Error: ": err });
	}
};

const getOrdersByDriverId = async (req: Request, res: Response) => {
	try {
		res.send(
			await OrderServices.getOrdersByDriverId(
				req.query.id!.toString()
			)
		);
	} catch (err) {
		res.status(400).send({ err });
	}
};

// Still working on active orders not complete

const getActiveOrders = async (req: Request, res: Response) => {
	try {
		res.send(await OrderServices.getActiveOrders());
	} catch (err) {
		res.send({ "Get Active Orders Error: ": err });
	}
};

const getActiveOrders2 = async (req: Request, res: Response) => {
	// let result = [];
	const orders = await prisma.orders.findMany({
		where: {
			orderStatus: 1
		},
		select: {
			userId: true,
			createdAt: true,
			users: {
				select: {
					firstName: true,
					email: true,
					countryCode: true,
					phoneNumber: true,
					shippingAddresses: {
						select: {
							streetAddress: true,
							city: true,
							state: true,
							postalCode: true,
							country: true,
							aptNmbr: true,
							lat: true,
							long: true
						}
					}
				}
			},
			orderItems: {
				select: {
					qty: true,
					products: {
						select: {
							title: true,
							categories: {
								select: {
									title: true
								}
							},
							stores: {
								select: {
									name: true,
									streetAddress: true,
									city: true,
									state: true,
									zip: true,
									lat: true,
									long: true
								}
							}
						}
					}
				}
			}
		}
	});

	for (const id in orders) {
		console.log(id + " = id");
	}
	return res.send({ orders: orders });
};

export {
	updateOrderStatus,
	createOrder,
	createOrder2,
	getActiveOrders,
	getOrderDetails,
	getUserOrders,
	getOrders,
	getOrdersByDriverId,
	getOrdersByUserId,
	getActiveOrders2
};
