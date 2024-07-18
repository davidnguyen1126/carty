import { prisma } from "../client";
import axios from "axios";
(async () => {
	const result = await prisma.products.findMany({});
	const stripeResult = await axios.get(
		"http://carty-stripe:4242/get-products"
	);

	const stripeProducts = await stripeResult.data.products.data;

	for (const stripeProduct of stripeProducts) {
		for (const product of result) {
			if (product.title === stripeProduct.name) {
				product.stripeProductId = stripeProduct.id;
				product.stripePriceId = stripeProduct.default_price;

				await prisma.products.update({
					where: {
						id: product.id
					},
					data: {
						stripeProductId: stripeProduct.id,
						stripePriceId: stripeProduct.default_price
					}
				});
			}
		}
	}
})();
