import { Request, Response } from "express";
import { StoreService } from "../services/StoreService";

const createStore = async (req: Request, res: Response) => {
	try {
		res.send(await StoreService.createStore(req.body.store));
	} catch (err) {
		res.status(500).send({ "Create Store Error: ": err });
	}
};

const deleteStore = async (req: Request, res: Response) => {
	try {
		res.send(
			await StoreService.deleteStore(parseInt(req.params.id as string))
		);
	} catch (err) {
		res.send({ "Delete Store Error: ": err });
	}
};

const updateStore = async (req: Request, res: Response) => {
	try {
		res.send(
			await StoreService.updateStore(
				parseInt(req.params.id as string),
				req.body.store
			)
		);
	} catch (err) {
		res.send({ "Delete Store Error: ": err });
	}
};

const getAllStores = async (req: Request, res: Response) => {
	try {
		res.send(await StoreService.getAllStores());
	} catch (err) {
		res.send({ "Get all stores Error: ": err });
	}
};

const getStore = async (req: Request, res: Response) => {
	try {
		console.log("req.", req.params.id);

		res.send(
			await StoreService.getStore(parseInt(req.params.id as string))
		);
	} catch (err) {
		res.send({ "Create Store Error: ": err });
	}
};

const getVendorStores = async (req: Request, res: Response) => {
	try {
		res.send(await StoreService.getVendorStores(req.query.id as string));
	} catch (err) {
		res.status(500).send({ "Get Vendor Stores Error: ": err });
	}
};

export {
	createStore,
	deleteStore,
	getAllStores,
	getStore,
	getVendorStores,
	updateStore
};
