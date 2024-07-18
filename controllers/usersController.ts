import { pool } from "../db/pg";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { convertUserToCamelCase } from "../utils/convertToCamelCase";
import { UserServices } from "../services/UserServices";

const prisma = new PrismaClient();

const addDriverAccessToken = async (req: Request, res: Response) => {
	try {
		res.send(await UserServices.addDriverAccessToken(req.body));
	} catch (err: any) {
		res.status(400).send(err);
	}
};

const addUserAccessToken = async (req: Request, res: Response) => {
	try {
		res.send(await UserServices.addUserAccessToken(req.body));
	} catch (err: any) {
		res.status(400).send(err);
	}
};

const getUser = async (req: Request, res: Response) => {
	const email = req.query.email as string;
	const client = await pool.connect();

	try {
		const user = await prisma.users.findUnique({
			where: {
				email: email
			},
			include: {
				shippingAddresses: true,
				billingAddresses: true
			}
		});

		const data = convertUserToCamelCase(user);

		res.send({ data });
	} catch (err) {
		console.log("err", err);
	}
};

// Prisma Endpoints

const getAllUsers = async (req: Request, res: Response) => {
	try {
		res.send(await UserServices.getAllUsers());
	} catch (err: any) {
		res.send({ "UserController.getAllUser Error": err });
	}
};

const createUser = async (req: Request, res: Response) => {
	try {
		res.send(await UserServices.createUser(req.body));
	} catch (err: any) {
		res.send({ "Create User Error: ": err });
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		res.send(await UserServices.deleteUser(req.query.id!.toString()));
	} catch (err) {
		res.send({ "Delete User Error: ": err });
	}
};

const getUserByEmail = async (req: Request, res: Response) => {
	try {
		res.send(
			await UserServices.getUserByEmail(req.query.email!.toString())
		);
	} catch (err) {
		res.send({ "UserController.getUserByEmail Error": err });
	}
};

export {
	addDriverAccessToken,
	addUserAccessToken,
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	getUserByEmail
};

