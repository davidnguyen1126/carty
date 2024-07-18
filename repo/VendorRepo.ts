import { prisma } from "../client";

export class VendorRepo {
  static async addStoreToVendor(vendorId: string, storeId: number) {
    try {
      const result = await prisma.vendors.update({
        where: {
          id: vendorId,
        },
        data: {
          stores: {
            connect: {
              id: storeId,
            },
          },
        },
      });

      return {
        data: result,
        msg: "Store added to Vendor",
      };
    } catch (err) {
      return { "Store added to Vendor Error: ": err };
    }
  }

  static async createVendor(body: any) {
    try {
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
      } = body;

      const result = await prisma.vendors.create({
        data: {
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
        },
      });

      return {
        data: result,
        msg: "Vendor Successfully Created",
      };
    } catch (err) {
      return { "DB Create Vendor Error: ": err };
    }
  }

  static async getAllVendors() {
    try {
      return await prisma.vendors.findMany({});
    } catch (err) {
      return { "Get All Vendors Error: ": err };
    }
  }

  static async getVendor(id: string) {
    try {
      return await prisma.vendors.findUnique({
        where: {
          id: id,
        },
      });
    } catch (err) {
      return { "Get Vendor Error: ": err };
    }
  }

  static async deleteVendor(id: string) {
    try {
      return await prisma.vendors.delete({
        where: {
          id: id,
        },
      });
    } catch (err) {
      return { "Delete Vendor Error: ": err };
    }
  }
}
