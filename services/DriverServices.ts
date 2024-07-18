import { DriverRepo } from "../repo/DriverRepo";

export class DriverServices {
    static createDriver(body: any) {
        return DriverRepo.createDriver(body);
    }

    static deleteDriver(id: string) {
        return DriverRepo.deleteDriver(id);
      }
    
      static getAllDrivers() {
        return DriverRepo.getAllDrivers();
      }
    
      static getDriver(id: string) {
        return DriverRepo.getDriver(id);
      }
}