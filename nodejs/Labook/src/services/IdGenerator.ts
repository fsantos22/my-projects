import { v4 } from "uuid";

export class IdGenerator {
  generateId = (): string => {
    return v4().replace(/[^a-zA-Z0-9]/g, "_");
  };
}
