import { VendorRepo } from "../repo/VendorRepo";

export class VendorServices {
  static addStoreToVendor(vendorId: string, storeId: number) {
    return VendorRepo.addStoreToVendor(vendorId, storeId);
  }

  static createVendor(body: any) {
    return VendorRepo.createVendor(body);
  }

  static deleteVendor(id: string) {
    return VendorRepo.deleteVendor(id);
  }

  static getAllVendors() {
    return VendorRepo.getAllVendors();
  }

  static getVendor(id: string) {
    return VendorRepo.getVendor(id);
  }
}
