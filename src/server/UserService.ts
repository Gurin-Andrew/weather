import { api } from "../http";
import { UserModel } from "../models/user";

export class UserService {
  static getUsers() {
    return api.get<UserModel[]>("/users");
  }
}
