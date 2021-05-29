import { User } from "../../src/model/User";
import { adminUserMock, normalUserMock } from "./userMocks";

export class UserDatabaseMock {
  public async signUp(user: User): Promise<void> {}

  public async getUserByEmail(email: string): Promise<User | undefined> {
    if(email === normalUserMock.getEmail()){
      return normalUserMock
    }
    if (email === adminUserMock.getEmail()) {
      return adminUserMock;
    }
  }
}

export default new UserDatabaseMock();
