import { DataSource } from "typeorm";
import { BindEntities } from "../entity";

export const Connection = new DataSource({
  name: "better-sqlite3",
  type: "better-sqlite3",
  database: "./medical_nursing_db.sqlite",
  logging: true,
  synchronize: true,
  entities: BindEntities,
});

export async function OpenConnection(): Promise<DataSource> {
  if (!Connection.isInitialized) await Connection.initialize();
  return Connection;
}

export async function CloseConnection(): Promise<void> {
  if (!Connection.isInitialized) await Connection.destroy();
}

// 拦截注解的函数，并在调用之前 打开数据库连接
export const SQLiteConnect = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFn = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      await OpenConnection();
      return await oldFn.apply(this, args);
    };
  };
};
