import { prisma } from "../client";
import { getAddressLatLong } from "../utils/geoCoding";
export class UserRepo {
	static async addDriverAccessToken(body: any) {
		const { id, accessToken } = body;

		try {
			return await prisma.accessTokens.create({
				data: {
					driverId: id,
					accessToken: accessToken
				},
				select: {
					driver: true
				}
			});
		} catch (err: any) {
			throw {
				err: `UserRepo.addDriverAccessToken error: ${err.message}`
			};
		}
	}

	static async addUserAccessToken(body: any) {
		const { id, accessToken } = body;

		try {
			return await prisma.accessTokens.create({
				data: {
					userId: id,
					accessToken: accessToken
				},
				select: {
					user: true
				}
			});
		} catch (err: any) {
			throw { err: `UserRepo.addUserAccessToken error: ${err.message}` };
		}
	}

	static async createUser(body: any) {
		try {
			const {
				id,
				email,
				dateOfBirth,
				firstName,
				lastName,
				countryCode,
				phoneNumber
			} = body;
			return await prisma.users.create({
				data: {
					id,
					email,
					dateOfBirth,
					firstName,
					lastName,
					countryCode,
					phoneNumber
				}
			});
		} catch (err: any) {
			return { err: `Create User Error: ${err.message}` };
		}
	}

	static async deleteUser(id: string) {
		try {
			let result = await prisma.users.delete({
				where: {
					id: id
				}
			});
			return result;
		} catch (err: any) {
			return { err: `Delete User Error: ${err.message}` };
		}
	}

	static async getAllUsers() {
		try {
			return await prisma.users.findMany();
		} catch (err: any) {
			throw { err: `UserRepo.getAllUsers error: ${err.message}` };
		}
	}

	static getUserByEmail(emailString: string) {
		try {
			return prisma.users.findFirst({
				where: {
					email: emailString
				},
				include: {
					shippingAddresses: true,
					billingAddresses: true
				}
			});
		} catch (err: any) {
			throw { err: `UserRepo.getUserByEmail error: ${err.message}` };
		}
	}
	static getDriverByEmail(emailString: string) {
		try {
			return prisma.drivers.findFirst({
				where: {
					email: emailString
				},
				include: {
					cars: true
				}
			});
		} catch (err: any) {
			throw { err: `UserRepo.getUserByEmail error: ${err.message}` };
		}
	}
}
