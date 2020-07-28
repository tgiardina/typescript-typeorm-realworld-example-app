import "reflect-metadata";
import { createConnection } from "typeorm";

export default async function init(): Promise<void> {
  await createConnection();
}
