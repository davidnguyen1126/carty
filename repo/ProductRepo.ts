import { prisma } from "../client";

export class ProductRepo {
	static createCategory(categories: any) {
		try {
			return prisma.categories.createMany({
				data: categories
			});
		} catch (err) {
			return { "Create Example Product Error: ": err };
		}
	}

	static async createProduct(product: any) {
		try {
			let {
				title,
				description,
				dosage,
				categoryId,
				effects,
				qty,
				price,
				storeId,
				image
			} = product;

			categoryId = parseInt(categoryId);
			qty = parseInt(qty);
			price = parseFloat(price);
			storeId = parseInt(storeId);

			return prisma.products.create({
				data: {
					title,
					description,
					dosage,
					categoryId,
					effects,
					qty,
					price,
					storeId,
					image
				}
			});
		} catch (err: any) {
			console.error("Create Product Error: ", err);
			throw new Error("Create Product Error: " + err.message);
		}
	}

	static createExampleProducts(products: any) {
		try {
			return prisma.products.createMany({
				data: products,
				skipDuplicates: true
			});
		} catch (err) {
			return { "Create Example Product Error: ": err };
		}
	}

	static getAllProducts() {
		try {
			return prisma.products.findMany({
				include: {
					categories: true,
					stores: true
				}
			});
		} catch (err) {
			return { "Get Product Error: ": err };
		}
	}

	static getProduct(id: number) {
		try {
			return prisma.products.findFirst({
				where: {
					id
				}
			});
		} catch (err) {
			return { "Get Product Error: ": err };
		}
	}

	static getCategories() {
		try {
			return prisma.categories.findMany({
				select: {
					id: true,
					title: true
				}
			});
		} catch (err) {
			return { "Get Product Error: ": err };
		}
	}

	static getProductsByStore(id: number) {
		try {
			return prisma.products.findMany({
				where: {
					storeId: id
				}
			});
		} catch (err) {
			return { "Get Product Error: ": err };
		}
	}
	static async updateProduct(id: number, product: any) {
		try {
			let {
				title,
				description,
				dosage,
				categoryId,
				effects,
				qty,
				price,
				storeId,
				image
			} = product;

			categoryId = parseInt(categoryId);
			qty = parseInt(qty);
			price = parseFloat(price);
			storeId = parseInt(storeId);

			return await prisma.products.update({
				where: { id },
				data: {
					title,
					description,
					dosage,
					categoryId,
					effects,
					qty,
					price,
					storeId,
					image
				}
			});
		} catch (err: any) {
			console.error("Update Product Error: ", err);
			throw new Error("Update Product Error: " + err.message);
		}
	}

	static async deleteProduct(id: number) {
		try {
			return await prisma.products.delete({
				where: { id }
			});
		} catch (err: any) {
			console.error("Delete Product Error: ", err);
			throw new Error("Delete Product Error: " + err.message);
		}
	}
}
