import { Connection, getConnection } from 'typeorm';

export async function initConnection(): Promise<Connection> {
  const connection = await getConnection();
  await Promise.all(connection.entityMetadatas.map(async (table) => {
    await connection.manager.query(`DELETE FROM ${table.tableName}`);
  }));
  return connection;
}
