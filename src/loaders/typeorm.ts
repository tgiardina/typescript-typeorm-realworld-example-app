import "reflect-metadata";
import { createConnection } from "typeorm";

export async function loadTypeorm(): Promise<void> {
  await createConnection();
}
