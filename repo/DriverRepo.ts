import { prisma } from "../client";

export class DriverRepo {
    static async createDriver(driverData: any) {
		const {
			id,
			firstName,
			lastName,
			email,
			countryCode,
			phoneNumber,
			dateOfBirth,
			address,
			city,
			state,
			postalCode,
			country,
			carMake,
			carModel,
			carYear,
			carColor,
			licensePlate
		} = driverData;

		try {
			return await prisma.drivers.create({
				data: {
					id,
					firstName,
					lastName,
					email,
					countryCode: parseInt(countryCode),
					phoneNumber,
					dateOfBirth: new Date(dateOfBirth),
					address,
					city,
					state,
					postalCode,
					country,
					cars: {
						create: {
							licensePlate: licensePlate,
							color: {
								connectOrCreate: {
									where: { name: carColor },
									create: { name: carColor }
								}
							},
							model: {
								connectOrCreate: {
									where: { name: carModel },
									create: {
										name: carModel,
										year: parseInt(carYear), // 'year' is just part of the data now, not part of unique identification
										make: {
											connectOrCreate: {
												where: {
													name: carMake
												},
												create: {
													name: carMake
												}
											}
										}
									}
								}
							}
						}
					}
				},
				include: {
					cars: true
				}
			});
		} catch (error) {
			console.error("Error creating driver:", error);
		}
	}

    static async getAllDrivers() {
        try {
            return await prisma.drivers.findMany({});
        } catch (err) {
            return { "Get All Drivers Error: ": err };
        }
    }

    static async getDriver(id: string) {
        try {
            return await prisma.drivers.findUnique({
                where: {
                    id: id,
                },
            });
        } catch (err) {
            return { "Get Driver Error: ": err };
        }
    }

    static async deleteDriver(id: string) {
        try {
            return await prisma.drivers.delete({
                where: {
                    id: id,
                },
            });
        } catch (err) {
            return { "Get Driver Error: ": err };
        }
    }
}