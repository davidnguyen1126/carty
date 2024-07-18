import { pool } from "../db/pg";

import { Request, Response, NextFunction } from "express";
import { category } from "../types/products";
import { ProductServices } from "../services/ProductServices";

const getCategories = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const client = await pool.connect();

	const sql = `
        SELECT 
            title
        FROM 
          categories c `;

	try {
		const result = await client.query(sql);
		req.body.categories = result.rows;
		return next();
	} catch (err) {
		console.log("err", err);
	}
};

const getProducts = async (req: any, res: any) => {
	const client = await pool.connect();

	const sql = `
        SELECT 
            p.id, 
            c.title as category,
            p.title, 
            description,
            dosage,
            effects,
            qty,
            price,
            store_id as storeId,
            image
        FROM 
            products p
        JOIN 
            categories c 
        ON 
            p.category_id = c.id`;
	try {
		const result = await client.query(sql);
		let { categories } = req.body;

		categories = categories.map((category: category) => {
			return category.title;
		});

		res.send({ categories, products: result.rows });
	} catch (err) {
		console.log("err", err);
	}
};

// Prisma Endpoints

const createCategories = async (req: any, res: any) => {
	try {
		res.send(await ProductServices.createCategories(req.body));
	} catch (err) {
		res.send({ "Create category Products Error: ": err });
	}
};

const createProduct = async (req: any, res: any) => {
	try {
		res.send(await ProductServices.createProduct(req.body));
	} catch (err) {
		res.status(500).send({ "Create category Products Error: ": err });
	}
};

const createExampleProducts = async (req: any, res: any) => {
	try {
		res.send(await ProductServices.createExampleProducts(req.body));
	} catch (err) {
		res.send({ "Create Example Products Error: ": err });
	}
};

const getProduct = async (req: Request, res: Response) => {
	try {
		console.log("req.query", req.params);

		res.send(
			await ProductServices.getProduct(parseInt(req.params.id as string))
		);
	} catch (err) {
		res.send({ "Get All Products Error: ": err });
	}
};

const getAllProducts = async (req: any, res: any) => {
	try {
		res.send(await ProductServices.getAllProducts());
	} catch (err) {
		res.send({ "Get All Products Error: ": err });
	}
};

// This should really by in a categories controller but theres not enough right now... Will refactor later
const getCategories2 = async (req: any, res: any) => {
	try {
		res.send(await ProductServices.getCategories());
	} catch (err) {
		res.send({ "Get All Products Error: ": err });
	}
};

const getProductsByStore = async (req: Request, res: Response) => {
	try {
		res.send(
			await ProductServices.getProductsByStore(
				parseInt(req.query.id as string)
			)
		);
	} catch (err) {
		res.status(500).send({ "Get producst by store Error: ": err });
	}
};

const updateProduct = async (req: Request, res: Response) => {
	try {
		// Access the ID from the URL path
		const { id } = req.params;

		// Assuming your updateProduct service needs the ID and the new product data
		const updatedProduct = await ProductServices.updateProduct(
			parseInt(id),
			req.body
		);

		res.send(updatedProduct);
	} catch (err: any) {
		res.status(500).send({ "Update product Error: ": err.message });
	}
};

const deleteProduct = async (req: Request, res: Response) => {
	try {
		res.send(
			await ProductServices.deleteProduct(
				parseInt(req.params.id as string)
			)
		);
	} catch (err) {
		res.status(500).send({ "Get producst by store Error: ": err });
	}
};

export {
	createCategories,
	createProduct,
	createExampleProducts,
	getCategories,
	getCategories2,
	getAllProducts,
	getProduct,
	getProducts,
	getProductsByStore,
	updateProduct,
	deleteProduct
};
