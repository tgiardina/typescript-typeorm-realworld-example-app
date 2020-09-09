import { Connection, createConnection, getConnection } from 'typeorm';

export async function initConnection(): Promise<Connection> {
  let connection: Connection;
  connection = getConnection();
  await Promise.all(connection.entityMetadatas.map(async (table) => {
    await connection.manager.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await connection.manager.query(`TRUNCATE ${table.tableName};`);
    await connection.manager.query(`SET FOREIGN_KEY_CHECKS = 1;`);
  }));
  return connection;
}
