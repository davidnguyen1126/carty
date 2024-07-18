import { Request, Response } from "express";
import { DriverServices } from "../services/DriverServices";

const createDriver = async (req: Request, res: Response) => {
	try {
		res.send(await DriverServices.createDriver(req.body));
	} catch (err: any) {
		res.status(400).send({ "Create Driver Error: ": err });
	}
};

const deleteDriver = async (req: Request, res: Response) => {
	try {
		res.send(await DriverServices.deleteDriver(req.body));
	} catch (err: any) {
		res.status(400).send({ "Delete Driver Error: ": err });
	}
};

const getAllDrivers = async (req: Request, res: Response) => {
	try {
		res.send(await DriverServices.getAllDrivers());
	} catch (err: any) {
		res.status(400).send({ "Get All Driver Error: ": err });
	}
};

const getDriver = async (req: Request, res: Response) => {
	try {
		res.send(await DriverServices.getDriver(req.body));
	} catch (err: any) {
		res.status(400).send({ "Get Driver Error: ": err });
	}
};

export {
    createDriver,
    deleteDriver,
    getAllDrivers,
    getDriver
};