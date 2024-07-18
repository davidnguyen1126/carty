import { prisma } from "../client";

export class OrderRepo {
	static async updateOrderStatus(driverId: any, orderId: any) {
		try {
			// First, retrieve the current order status
			const order = await prisma.orders.findUnique({
				where: { id: orderId },
				select: { orderStatus: true }
			});

			// Check if the order was found and has a valid status
			if (!order || order.orderStatus === null) {
				throw new Error("Order not found or has an invalid status");
			}

			// Increment the order status
			const updatedOrderStatus = order.orderStatus + 1;

			// Then, update the order with the incremented status
			const updatedOrder = await prisma.orders.update({
				where: { id: orderId },
				data: {
					driverId: driverId,
					orderStatus: updatedOrderStatus
				},
				include: {
					shippingAddresses: true,
					drivers: true,
					orderItems: {
						include: {
							products: {
								include: {
									stores: true
								}
							}
						}
					}
				}
			});

			console.log("Order updated successfully:", updatedOrder);
			return updatedOrder;
		} catch (error) {
			console.error("Error updating order status:", error);
			throw error; // Re-throw the error to be handled by the caller
		}
	}

	static async createOrder(order: any, cart: any) {
		try {
			const {
				user,
				orderBillingAddressId,
				orderShippingAddressId,
				storeId,
				orderTotal
			} = order;

			const cartItems = order.cart.map(
				(item: { quantityInCart: any; id: any }) => {
					return {
						qty: item.quantityInCart,
						productId: item.id
					};
				}
			);

			try {
				const result = await prisma.orders.create({
					data: {
						userId: user.id,
						driverId: null,
						orderStatus: 1,
						deliveryAddressId: orderShippingAddressId,
						billingAddressId: orderBillingAddressId,
						pickupAddressId: storeId,
						deliveredAt: null,
						orderTotal: parseFloat(orderTotal),
						orderItems: {
							create: cartItems
						}
					}
				});
			} catch (err) {
				throw err;
			}

			await Promise.all(
				cart.map((item: any) => {
					return prisma.products.update({
						where: {
							id: item.id,
							storeId: item.storeId
						},
						data: {
							qty: {
								decrement: item.quantityInCart
							}
						}
					});
				})
			);

			return {
				data: order,
				msg: "Order Successfully Created"
			};
		} catch (err) {
			return { "Get Order Error: ": err };
		}
	}

	static getActiveOrders() {
		try {
			return prisma.orders.findMany({
				where: {
					orderStatus: 1
				},
				include: {
					shippingAddresses: true,
					stores: true,
					orderItems: {
						include: {
							products: {
								include: {
									stores: true
								}
							}
						}
					}
				}
			});
		} catch (err) {
			return { "Get Active Orders Error: ": err };
		}
	}
	static getOrders() {
		try {
			return prisma.orders.findMany();
		} catch (err) {
			return { "Get Order Error: ": err };
		}
	}

	static async getOrdersByUserId(id: string) {
		try {
			return await prisma.orders.findMany({
				where: {
					userId: id
				},
				include: {
					shippingAddresses: true,
					drivers: true,
					orderItems: {
						include: {
							products: {
								include: {
									stores: true
								}
							}
						}
					}
				}
			});
		} catch (err) {
			throw err;
		}
	}
	static async getOrdersByDriverId(id: string) {
		try {
			return await prisma.orders.findMany({
				where: {
					driverId: id
				},
				include: {
					shippingAddresses: true,
					drivers: true,
					orderItems: {
						include: {
							products: {
								include: {
									stores: true
								}
							}
						}
					}
				}
			});
		} catch (err) {
			throw { err: `OrderRepo.getOrdersByDriverId Error: ${err}` };
		}
	}
}

