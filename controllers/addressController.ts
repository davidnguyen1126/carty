import { AddressServices } from "../services/AddressServices";
import { Request, Response } from "express";

const createBillingAddress = async (req: Request, res: Response) => {
    try {
        res.send(await AddressServices.createBillingAddress(req.body));
    } catch (err: any) {
        res.status(400).send(err);
    }
};

const createShippingAddress = async (req: Request, res: Response) => {
	try {
		res.send(await AddressServices.createShippingAddress(req.body));
	} catch (err: any) {
		res.status(400).send(err);
	}
};

const deleteBillingAddress = async (req: Request, res: Response) => {
	try {
		res.send(await AddressServices.deleteBillingAddress(req.query.id!.toString()));
	} catch (err) {
		res.send({ "Delete Billing Address Error: ": err });
	}
};

const deleteShippingAddress = async (req: Request, res: Response) => {
	try {
		res.send(await AddressServices.deleteShippingAddress(req.query.id!.toString()));
	} catch (err) {
		res.send({ "Delete Shipping Address Error: ": err });
	}
};

const getBillingAddress = async (req: Request, res: Response) => {
    try {
        res.send(await AddressServices.getBillingAddress(req.query.id!.toString()));
    } catch (err) {
        res.send({ "Get Billing Address Error: ": err });
    }
};

const getShippingAddress = async (req: Request, res: Response) => {
	try {
		res.send(
			await AddressServices.getShippingAddress(req.query.streetAddress)
		);
	} catch (err) {
		res.send({"Get Shipping Address Error: ":err});
	}
};

export {
    createBillingAddress,
    createShippingAddress,
    deleteBillingAddress,
    deleteShippingAddress,
    getBillingAddress,
    getShippingAddress
};
