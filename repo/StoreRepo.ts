import { prisma } from "../client";
import { getAddressLatLong } from "../utils/geoCoding";

export class StoreRepo {
	static async checkStoreExists(streetAddress: string) {
		try {
			return await prisma.stores.findFirst({
				where: {
					streetAddress
				}
			});
		} catch (err) {
			throw err;
		}
	}
	static async createStore(store: any) {
		try {
			console.log("store", store);

			const { name, zip, vendorId } = store;
			const geoCodedStore = await getAddressLatLong(store, false);
			const { streetAddress, city, state, country, lat, long } =
				geoCodedStore;

			return prisma.stores.create({
				data: {
					name,
					streetAddress,
					city,
					state,
					country,
					zip,
					lat,
					long,
					vendorId
				}
			});
		} catch (err) {
			throw { "Create Store Error: ": err };
		}
	}

	static async getStore(id: number) {
		try {
			return await prisma.stores.findUnique({
				where: {
					id: id
				},
				include: {
					products: {
						include: {
							categories: true
						}
					}
				}
			});
		} catch (err) {
			return { "Get Store Error: ": err };
		}
	}

	static async getAllStores() {
		try {
			return await prisma.stores.findMany({});
		} catch (err) {
			return { "Get All Stores Error: ": err };
		}
	}

	static async getVendorsStores(id: string) {
		try {
			return await prisma.stores.findMany({
				where: { vendorId: id }
			});
		} catch (err) {
			return { "Get All Stores Error: ": err };
		}
	}

	static async deleteStore(id: number) {
		try {
			return await prisma.stores.delete({
				where: {
					id: id
				}
			});
		} catch (err) {
			return { "Delete Store Error: ": err };
		}
	}

	static async updateStore(id: number, storeDetails: any) {
		console.log("storeDetails", storeDetails);

		try {
			let {
				name,
				streetAddress,
				city,
				state,
				country,
				zip,
				vendorId,
				lat,
				long
			} = storeDetails;

			lat = parseFloat(lat);
			long = parseFloat(long);

			return await prisma.stores.update({
				where: { id },
				data: {
					name,
					streetAddress,
					city,
					state,
					country,
					zip,
					vendorId,
					lat,
					long
				}
			});
		} catch (err: any) {
			console.error("Update Store Error: ", err);
			throw new Error("Update Store Error: " + err.message);
		}
	}
}
