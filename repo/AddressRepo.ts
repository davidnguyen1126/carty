import { prisma } from "../client";
import { getAddressLatLong } from "../utils/geoCoding";

export class AddressRepo {
  static async createBillingAddress(body: any) {
    try {
      const geoCodedBody = await getAddressLatLong(body, true);

      const {
        streetAddress,
        city,
        state,
        postalCode,
        country,
        aptNmbr,
        lat,
        long,
      } = geoCodedBody;
      return prisma.billingAddresses.create({
        data: {
          streetAddress,
          city,
          state,
          postalCode,
          country,
          userId: body.userId,
          aptNmbr,
          lat,
          long,
        },
      });
    } catch (err: any) {
      throw { err: `Create Billing Address Error: ${err.message}` };
    }
  }

  static async createShippingAddress(body: any) {
		try {
			const geoCodedBody = await getAddressLatLong(body, false);

			const {
				streetAddress,
				city,
				state,
				postalCode,
				country,
				userId,
				aptNmbr,
				lat,
				long
			} = geoCodedBody;

			return prisma.shippingAddresses.create({
				data: {
					streetAddress,
					city,
					state,
					postalCode,
					country,
					userId,
					aptNmbr,
					lat,
					long
				}
			});
		} catch (err: any) {
			throw { err: `Create Shipping Address Error: ${err.message}` };
		}
	}

  static async deleteBillingAddress(id: string) {
    try {
      let result = await prisma.billingAddresses.delete({
        where: {
          id: id
        }
      });
      return result
    } catch (err) {

    }
  }

  static async deleteShippingAddress(id: string) {
    try {
      let result = await prisma.shippingAddresses.delete({
        where: {
          id: id
        }
      });
      return result
    } catch (err) {

    }
  }

  static async getBillingAddress(streetAddress: string) {
    try {
      return await prisma.billingAddresses.findFirst({
        where: {
          streetAddress: {
            contains: streetAddress.trim(),
            mode: "insensitive",
          },
        },
      });
    } catch (err: any) {
      throw { err: `AddressRepo.getBillingAddress error: ${err.message}` };
    }
  }

  static async getShippingAddress(streetAddress: string) {
		try {
			return await prisma.shippingAddresses.findFirst({
				where: {
					streetAddress: {
						contains: streetAddress.trim(),
						mode: "insensitive"
					}
				}
			});
		} catch (err: any) {
			throw { err: `AddressRepo.getShippingAddress error: ${err.message}` };
		}
	}
}
