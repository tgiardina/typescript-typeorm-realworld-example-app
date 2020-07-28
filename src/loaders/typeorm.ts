import "reflect-metadata";
import { createConnection } from "typeorm";

export default async function init(): Promise<void> {
  await createConnection({
    type        : "mysql",
    host        : process.env.DB_HOST,
    port        : parseInt(process.env.DB_PORT),
    username    : process.env.DB_USER,
    password    : process.env.DB_PASSWORD,
    database    : process.env.DB_NAME,
    entities    : [
      `${__dirname}/../models/*.ts`,
    ],
    synchronize: true
  })
}
