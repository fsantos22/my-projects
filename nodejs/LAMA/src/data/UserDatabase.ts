import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_users";

  public async signUp(
    user:User
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          user_id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          password: user.getPassword(),
          role: user.getRole()
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    if(result[0]){
      return User.toUserModel(result[0]);
    } else{
      return undefined
    }
  }

}

export default new UserDatabase()
