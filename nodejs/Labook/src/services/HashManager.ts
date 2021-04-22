import * as bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export class HashManager {
  private cost: number = Number(process.env.BCRYPT_COST);

  async hash(s: string): Promise<string> {
    if (isNaN(Number(this.cost))) {
      throw new Error("Cost must be a number");
    }
    const salt = await bcrypt.genSalt(this.cost);
    return bcrypt.hash(s, salt);
  }

  async compare(s: string, hash: string): Promise<boolean> {
    return bcrypt.compare(s, hash);
  }
}