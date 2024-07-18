import { AddressRepo } from "../repo/AddressRepo";

export class AddressServices {
    static createBillingAddress(body: any) {
        return AddressRepo.createBillingAddress(body);
    }

    static createShippingAddress(body: any) {
        return AddressRepo.createShippingAddress(body);
    }

    static deleteBillingAddress(id: string) {
        return AddressRepo.deleteBillingAddress(id);
    }

    static deleteShippingAddress(id: string) {
        return AddressRepo.deleteShippingAddress(id);
    }

    static getBillingAddress(id: string) {
        return AddressRepo.getBillingAddress(id);
    }

    static getShippingAddress(body: any) {
        return AddressRepo.getShippingAddress(body);
    }
}