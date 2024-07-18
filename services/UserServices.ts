import { UserRepo } from "../repo/UserRepo";

export class UserServices {
  static addDriverAccessToken(body: any) {
    return UserRepo.addDriverAccessToken(body);
  }

  static addUserAccessToken(body: any) {
    return UserRepo.addUserAccessToken(body);
  }

  static createUser(body: any) {
    return UserRepo.createUser(body);
  }

  static deleteUser(id: string) {
    return UserRepo.deleteUser(id);
  }

  static getAllUsers() {
    return UserRepo.getAllUsers();
  }

  static async getUserByEmail(emailString: string) {
    return (
      (await UserRepo.getUserByEmail(emailString)) ||
      (await UserRepo.getDriverByEmail(emailString))
    );
  }

  static getDriverByEmail(emailString: string) {
    return UserRepo.getDriverByEmail(emailString);
  }
}
