import "reflect-metadata";
import { createConnection } from "typeorm";

export default async function load(): Promise<void> {
  await createConnection();
}
