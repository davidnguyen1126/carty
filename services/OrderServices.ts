import { OrderRepo } from "../repo/OrderRepo";

export class OrderServices {
	static updateOrderStatus(body: any) {
		return OrderRepo.updateOrderStatus(body.driverId, body.orderId);
	}
	static createOrder(order: any, cart: any) {
		return OrderRepo.createOrder(order, cart);
	}

	static getActiveOrders() {
		return OrderRepo.getActiveOrders();
	}

	static getOrders() {
		return OrderRepo.getOrders();
	}

	static getOrdersByUserId(id: string) {
		return OrderRepo.getOrdersByUserId(id);
	}
	static getOrdersByDriverId(id: string) {
		return OrderRepo.getOrdersByDriverId(id);
	}
}
