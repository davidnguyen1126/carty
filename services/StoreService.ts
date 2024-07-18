import { StoreRepo } from "../repo/StoreRepo";

export class StoreService {
	static createStore(store: any) {
		return StoreRepo.createStore(store);
	}

	static getStore(id: number) {
		return StoreRepo.getStore(id);
	}

	static getAllStores() {
		return StoreRepo.getAllStores();
	}

	static getVendorStores(id: string) {
		return StoreRepo.getVendorsStores(id);
	}

	static deleteStore(id: number) {
		return StoreRepo.deleteStore(id);
	}
	static updateStore(id: number, store: any) {
		return StoreRepo.updateStore(id, store);
	}
}
