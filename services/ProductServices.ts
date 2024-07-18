import { ProductRepo } from "../repo/ProductRepo";

export class ProductServices {
	static createCategories(categories: any) {
		return ProductRepo.createCategory(categories);
	}

	static createProduct(product: any) {
		return ProductRepo.createProduct(product);
	}
	static createExampleProducts(products: any) {
		return ProductRepo.createExampleProducts(products);
	}

	static getAllProducts() {
		return ProductRepo.getAllProducts();
	}

	static getProduct(id: number) {
		return ProductRepo.getProduct(id);
	}

	static getProductsByStore(id: number) {
		return ProductRepo.getProductsByStore(id);
	}

	static getCategories() {
		return ProductRepo.getCategories();
	}
	static updateProduct(id: number, product: any) {
		console.log("id in service", id, typeof id);

		return ProductRepo.updateProduct(id, product);
	}
	static deleteProduct(product: any) {
		return ProductRepo.deleteProduct(product);
	}
}
