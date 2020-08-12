import "reflect-metadata";
import { createConnection } from "typeorm";

export async function loadDatabase(): Promise<void> {
  await createConnection();
}
