import { DataSource } from "typeorm";

 export const Connection = new DataSource({
   name: "better-sqlite3",
   type: "better-sqlite3",
   database: "./data.sqlite",
   logging: true,
   synchronize: true,
 });

export async function OpenConnection(): Promise<DataSource> {
  if (!Connection.isInitialized) await Connection.initialize();
  return Connection;
}

export async function CloseConnection(): Promise<void> {
  if (!Connection.isInitialized) await Connection.destroy();
}
