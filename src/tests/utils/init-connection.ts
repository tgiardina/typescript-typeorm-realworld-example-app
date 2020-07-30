import { Connection, createConnection, getConnection } from 'typeorm';

export async function initConnection(): Promise<Connection> {
  let connection;
  try {
    connection = await getConnection();
  } catch(err) {
    connection = await createConnection();
  }
  await Promise.all(connection.entityMetadatas.map(async (table) => {
    await connection.manager.query(`DELETE FROM ${table.tableName}`);
  }));
  return connection;
}
